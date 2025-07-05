import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { IContenidoAudiovisual } from '@/data/contenidosAudiovisuales';
import { IGeneroContenidoAudiovisual } from '@/data/generosContenidoAudiovisual';
import { ITipoContenidoAudiovisual } from '@/data/tiposContenidoAudiovisual';

interface AudioVisualContextoDato {
    contenidos: IContenidoAudiovisual[];
    generos: IGeneroContenidoAudiovisual[];
    tipos: ITipoContenidoAudiovisual[];

    //funciones para usar fuera
    getContenidoId: (id: number) => IContenidoAudiovisual | undefined;
    getGeneroId: (id: number) => IGeneroContenidoAudiovisual | undefined;
    getTipoId: (id: number) => ITipoContenidoAudiovisual | undefined;
    getContenidosTipo: (tipoId: number) => IContenidoAudiovisual[];
    getGenerosContenido: (contenido: IContenidoAudiovisual) => IGeneroContenidoAudiovisual[];
    filtrarContenidos: (tipoIds: number[], generoIds: number[]) => IContenidoAudiovisual[];
}
// crear el contexto
const AudioVisualContext = createContext<AudioVisualContextoDato | undefined>(undefined);
// props para el proveedor
interface AudioVisualProviderProps {
    children: ReactNode;
}
// proveedor del contexto
export function AudioVisualProvider({ children }: AudioVisualProviderProps) {
    const [contenidos, setContenidos] = useState<IContenidoAudiovisual[]>([]);
    const [generos, setGeneros] = useState<IGeneroContenidoAudiovisual[]>([]);
    const [tipos, setTipos] = useState<ITipoContenidoAudiovisual[]>([]);

    useEffect(() => {
        fetch('/contenidos')
            .then(res => res.json())
            .then(setContenidos);
        fetch('/generos')
            .then(res => res.json())
            .then(setGeneros);
        fetch('/tipos')
            .then(res => res.json())
            .then(setTipos);
    }, []);

    const getContenidoId = (id: number): IContenidoAudiovisual | undefined => {
        return contenidos.find(contenido => contenido.id === id);
    };

    const getGeneroId = (id: number): IGeneroContenidoAudiovisual | undefined => {
        return generos.find(genero => genero.id === id);
    };

    const getTipoId = (id: number): ITipoContenidoAudiovisual | undefined => {
        return tipos.find(tipo => tipo.id === id);
    };

    const getContenidosTipo = (tipoId: number): IContenidoAudiovisual[] => {
        return contenidos.filter(contenido => contenido.tipoId === tipoId);
    };

    const getGenerosContenido = (contenido: IContenidoAudiovisual): IGeneroContenidoAudiovisual[] => {
        return contenido.generos
            .map(generoId => getGeneroId(generoId))
            .filter((genero): genero is IGeneroContenidoAudiovisual => genero !== undefined);
    };

    const filtrarContenidos = (tipoIds: number[], generoIds: number[]): IContenidoAudiovisual[] => {
        return contenidos.filter(contenido => {
            // Filtrar por tipo
            const tipoMatch = tipoIds.length === 0 || tipoIds.includes(contenido.tipoId);
            // Filtrar por género 
            const generoMatch = generoIds.length === 0 ||
                contenido.generos.some(generoId => generoIds.includes(generoId));

            return tipoMatch && generoMatch;
        });
    };

    // Valor que se va a compartir en el contexto
    const contextValue: AudioVisualContextoDato = {
        contenidos,
        generos,
        tipos,
        getContenidoId,
        getGeneroId,
        getTipoId,
        getContenidosTipo,
        getGenerosContenido,
        filtrarContenidos,
    };

    return (
        <AudioVisualContext.Provider value={contextValue}>
            {children}
        </AudioVisualContext.Provider>
    );
}
//hook para usar afuera
export function useAudioVisual(): AudioVisualContextoDato {
    const context = useContext(AudioVisualContext);

    if (context === undefined) {
        throw new Error('useAudioVisual debe ser usado dentro de AudioVisualProvider');
    }
    return context;
}