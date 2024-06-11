import jwt from 'jsonwebtoken';

interface JwtPayload {
    id: string;
    email: string;
    city: string;
}

export const getCityFromToken = (token: string): string | null => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        console.log(decoded);
        return decoded.city;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};
