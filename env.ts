import 'dotenv/config'

export class Env {
    declare DB_NAME: string;
    declare DB_USER: string;
    declare DB_PASSWORD: string;
    declare DB_HOST: string;
    declare DB_PORT: number;

    public static get(): Env 
    {
        return <Env>(<unknown> process.env);
    }
}