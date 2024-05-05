export interface User {
    id: string;
    email: string;
    location: {
        zipcode: string;
        city: string;
        street: string;
        streetNumber: string;
        meters: string;
    }
    username: string;
    name: {
        firstname: string;
        lastname: string;
    }
}