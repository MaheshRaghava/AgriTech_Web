
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const LoginForm = () => {
const { login } = useAuth();
const { translate } = useLanguage();
const navigate = useNavigate();

// Flip animation state — preserving your current flip logic
const [isFlipped, setIsFlipped] = useState(false);

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();

if (!email || !password) {
toast.error('Please fill in all fields');
return;
}

setIsLoading(true);

try {
// Call login WITHOUT manual user localStorage check or password verification here
const success = await login(email, password);

if (success) {
toast.success('Login successful!');
navigate('/');
} else {
toast.error('Login failed. invalid password.');
}
} catch (error) {
toast.error('An error occurred during login.');
console.error(error);
} finally {
setIsLoading(false);
}
};

return (
<form
onSubmit={handleSubmit}
className={`space-y-4 ${isFlipped ? 'flipped-class' : ''}`} // Keep flip animation classes here
>
<div className="space-y-2">
<Label htmlFor="email">{translate('auth.email')}</Label>
<Input
id="email"
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
/>
</div>
<div className="space-y-2">
<Label htmlFor="password">{translate('auth.password')}</Label>
<Input
id="password"
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/>
</div>
<Button type="submit" disabled={isLoading} className="w-full">
{isLoading ? 'Logging in...' : translate('auth.login')}
</Button>
</form>
);
};

export default LoginForm;
