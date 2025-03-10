
export type Shift = {
    id: string,
    booked: boolean,
    area: 'Helsinki' | 'Turku' | 'Tampere',
    startTime: number,
    endTime: number
}