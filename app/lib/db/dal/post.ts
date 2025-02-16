import { EventPost, EventPostInput, EventPostOutput } from '../models/post'

export const create = async (payload: EventPostInput): Promise<EventPostOutput> => {
    console.log('creating payload',)
    const post = await EventPost.create(payload)
    return post
}

export const getById = async (id: number): Promise<EventPostOutput> => {
    const post = await EventPost.findByPk(id)
    if (!post) {
        throw new Error("Failed to find EventPost with id: " + id)
    }
    return post
}

export const update = async (id: number, payload: Partial<EventPostInput>): Promise<EventPostOutput> => {
    const post = await getById(id)
    const updatedPost = await (post as EventPost).update(payload)
    return updatedPost 
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedPostCount = await EventPost.destroy({
        where: { id }
    })
    return !!deletedPostCount
}

export const getAll = async (): Promise<EventPostOutput[]> => {
    return EventPost.findAll()
}