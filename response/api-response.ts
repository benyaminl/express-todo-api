export class APIResponse{
    declare success: boolean;
    declare message: string;
    declare data: any;

    constructor(message: string,success: boolean = true, data: any = [])
    {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}