import { EventTag, EventTagInput, EventTagOutput } from '../models/tag'

export const create = async (payload: EventTagInput): Promise<EventTagOutput> => {
    const tag = await EventTag.create(payload)
    return tag
}

export const getById = async (id: number): Promise<EventTagOutput> => {
    const tag = await EventTag.findByPk(id)
    if (!tag) {
        throw new Error("Failed to find EventTag with id: " + id)
    }
    return tag
}

export const update = async (id: number, payload: Partial<EventTagInput>): Promise<EventTagOutput> => {
    const tag = await getById(id)
    const updatedTag = await (tag as EventTag).update(payload)
    return updatedTag 
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedTagCount = await EventTag.destroy({
        where: { id }
    })
    return !!deletedTagCount
}

export const getAll = async (): Promise<EventTagOutput[]> => {
    return EventTag.findAll()
}