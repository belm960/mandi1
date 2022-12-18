export class JwtResponse {
    id: number;
    accessToken: string;
    type: string;
    username: string;
    authorities: string[];
}