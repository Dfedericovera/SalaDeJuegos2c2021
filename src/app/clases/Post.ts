export class Post
{

    public id: string;
    public titulo: string;
    public contenido: string;
    public usuario: Array<any>;

    public constructor(init?: Partial<Post>)
    {
        if (init)
        {
            Object.assign(this, init);
        }
    }

    public static CrearProfesional(id: string, titulo: string, contenido: string,
        usuario: Array<any>, email: string): Post
    {
        let post = new Post();

        post.id = id;
        post.titulo = titulo;
        post.contenido = contenido;
        post.usuario = usuario;


        return post;
    }


}