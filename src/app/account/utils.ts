import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../interfaces/user";
import { ChangeEvent } from "react";

export const generateNewAccessToken = (refreshToken: string) => {
    try {
        const decoded = jwt.verify(refreshToken, 'refresh_secret_jwt');
        if (typeof decoded === 'object' && decoded !== null) {
            const data: JwtPayload = decoded as jwt.JwtPayload;
            const newAccessToken = jwt.sign({ ...data }, 'access_secret_jwt');
            localStorage.setItem('accessToken', newAccessToken);
            return newAccessToken;
        } else {
            console.error('decoded n\'est pas un objet JwtPayload');
        }
    } catch (error) {
        console.error('Error generating new access token:', error);
        throw error;
    }
};

export const verifyAndSetUser = (accessToken: string, setUser: (user: User) => void) => {
    try {
        const verifiedData = jwt.verify(accessToken, 'access_secret_jwt');
        if (typeof verifiedData !== 'string') {
            const data: JwtPayload = verifiedData;
            const userData: User = {
                name: data.name ?? '',
                surname: data.surname ?? '',
                street: data.street ?? '',
                city: data.city ?? '',
                postal_code: data.postal_code ?? '',
                phone: data.phone ?? '',
                mail: data.mail ?? '',
                role: data.role ?? '',
                code_referral: data.code_referral ?? '',
            };
            setUser(userData);
        }
    } catch (error) {
        console.error('Failed to parse access token or verify JWT:', error);
        throw error;
    }
};

export const isUserDataValid = (user: User | null) => {
    return user?.name && user?.surname && user?.street && user?.city && user?.postal_code && user?.phone && user?.mail;
};

export const handleTokenVerification = (setUser: (user: User) => void) => {
    let accessToken: string | null = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken) {
        console.error('No access token found in localStorage.');
        return;
    }

    try {
        verifyAndSetUser(accessToken, setUser);
    } catch (error: any) {
        if (error.name === 'TokenExpiredError' && refreshToken) {
            try {
                const newAccessToken = generateNewAccessToken(refreshToken);
                if (typeof newAccessToken === 'string') {
                    accessToken = newAccessToken;
                    verifyAndSetUser(accessToken, setUser);
                }
            } catch (refreshError) {
                console.error('Failed to refresh access token:', refreshError);
            }
        }
    }
};

export const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    modifiedUser: User | null,
    setModifiedUser: React.Dispatch<React.SetStateAction<User | null>>
) => {
    const { name, value } = e.target;
    if (modifiedUser !== null) {
        setModifiedUser({
            ...modifiedUser,
            [name]: value
        });
    } else {
        setModifiedUser({
            name: '',
            surname: '',
            street: '',
            city: '',
            postal_code: '',
            phone: '',
            mail: '',
            role: '',
            code_referral: '',
            [name]: value
        });
    }
};

export const sendModifiedData = async (
    modifiedUser: User | null,
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
) => {
    try {
        const response = await fetch('http://localhost:4000/auth/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: modifiedUser?.name,
                surname: modifiedUser?.surname,
                currentMail: user?.mail,
                newMail: modifiedUser?.mail,
                phone: modifiedUser?.phone,
                street: modifiedUser?.street,
                city: modifiedUser?.city,
                postalCode: modifiedUser?.postal_code
            })
        });
        if (!response.ok) {
            throw new Error('Failed to modify data');
        }

        const { accessToken, refreshToken } = await response.json();
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        verifyAndSetUser(accessToken, setUser);
    } catch (error) {
        console.error('Failed to modify data:', error);
    }
};

export const sendModifiedPassword = async (
    user: User | null,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
    setAlertMessage: React.Dispatch<React.SetStateAction<string>>,
    setAlertType: React.Dispatch<React.SetStateAction<'success' | 'error'>>
) => {
    if (newPassword === confirmPassword) {
        try {
            const response = await fetch('http://localhost:4000/auth/update-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ mail: user?.mail, oldPassword, newPassword })
            });
            if (!response.ok) {
                setAlertMessage('Échec de la modification de mot de passe');
                setAlertType('error');
            } else {
                setAlertMessage('Modification du mot de passe réussie');
                setAlertType('success');
            }
        } catch (error) {
            console.error('Failed to modify password:', error);
        }
    } else {
        console.error('Erreur de modification, veuillez réitérer');
    }
};
