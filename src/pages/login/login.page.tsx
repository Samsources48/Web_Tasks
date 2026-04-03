import { SignIn } from '@clerk/clerk-react';

export const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary dark:bg-gray-900">
            <SignIn 
                path="/login" 
                routing="path" 
                appearance={{
                    variables: { colorPrimary: '#fb923c' },
                     elements: {
                         card: "shadow-2xl rounded-2xl"
                     }
                }}
            />
        </div>
    );
};
