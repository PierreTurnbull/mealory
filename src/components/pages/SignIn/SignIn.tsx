import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button, CircularProgress, Input } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { dbClient } from "../../../dbClient/dbClient";
import { Title } from "../../common/Title/Title";
import { useNotificationsContext } from "../../features/notification/context/useNotificationsContext";

export const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [mustShowPassword, setMustShowPassword] = useState(false);

	const [isLoading, setIsLoading] = useState(false);

	const notificationsContext = useNotificationsContext();
	const navigate = useNavigate();

	const submit = async () => {
		setIsLoading(true);

		const { data, error } = await dbClient.auth.signInWithPassword({
			email:    email,
			password: password,
		});

		setIsLoading(false);

		if (data.user) {
			navigate("/");
		} else if (error) {
			notificationsContext.addNotification("Les identifiants sont incorrects.", "error");
		}
	};

	const VisibilityIconComponent = mustShowPassword ? VisibilityIcon : VisibilityOffIcon;

	return (
		<div className="flex flex-col gap-2 p-16 h-screen justify-center">
			<Title
				title="Connexion"
				rank="h3"
				className="text-center"
			/>
			<p>Adresse email :</p>
			<Input
				fullWidth
				value={email}
				onChange={event => setEmail(event.target.value)}
				disabled={isLoading}
			/>
			<p>Mot de passe :</p>
			<Input
				fullWidth
				value={password}
				onChange={event => setPassword(event.target.value)}
				type={mustShowPassword ? "text" : "password"}
				endAdornment={
					<VisibilityIconComponent
						onClick={() => setMustShowPassword(prev => !prev)}
					/>
				}
				className="pr-2"
				disabled={isLoading}
			/>
			<Button
				onClick={submit}
				disabled={isLoading}
			>
				{
					isLoading
						? <CircularProgress size={16} />
						: "Me connecter"
				}
			</Button>
			<Button
				onClick={() => navigate("/sign-up")}
				color="secondary"
				disabled={isLoading}
			>
				Créer mon compte
			</Button>
		</div>
	);
};