
export abstract class IGenericRepository<T> {
    abstract getAll(): Promise<any[]>;
  
    abstract get(id: string): Promise<any>;
  
    abstract create(item: any): Promise<any>;
  
    abstract update(id: string, item: any);
  }