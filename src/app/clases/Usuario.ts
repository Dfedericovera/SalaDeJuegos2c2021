export class User {
    public id: string;
    public name: string;
    public lastName: string;
    public photos: Array<any>;
    public email: string;

    public constructor(init?: Partial<User>) {
        if(init){
            Object.assign(this, init);
        }        
    }

    public static CrearProfesional(id: string, name: string, lastName: string,
        photos: Array<any>, email: string) :User {
        let patient = new User();
        
        patient.id = id;
        patient.name = name;
        patient.lastName = lastName;
        patient.photos = photos;
        patient.email = email;
        

        return patient;
    }


}