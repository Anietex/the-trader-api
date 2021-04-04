/**
 * Base Repository
 */
export default interface BaseRepository {
    create(data: any): Promise<any>;
    update(criteria: any, data: any): Promise<any>;
    get(criteria: any): Promise<any>;
    getAll(criteria: any): Promise<any>;
    getPaginated(criteria: any): Promise<any>;
}
