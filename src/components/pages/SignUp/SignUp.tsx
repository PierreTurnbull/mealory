import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button, CircularProgress, Input } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { dbClient } from "../../../dbClient/dbClient";
import { Title } from "../../common/Title/Title";
import { useNotificationContext } from "../../features/notification/context/useNotificationContext";

export const SignUp = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [mustShowPassword, setMustShowPassword] = useState(false);

	const [isLoading, setIsLoading] = useState(false);

	const notificationContext = useNotificationContext();
	const navigate = useNavigate();

	const submit = async () => {
		setIsLoading(true);

		const { data, error } = await dbClient.auth.signUp({
			email:    email,
			password: password,
		});

		setIsLoading(false);

		if (data.user) {
			notificationContext.addNotification("Félicitations, vous avez créé votre compte !", "success");
			navigate("/");
		} else if (error) {
			console.error(error);
			notificationContext.addNotification("Une erreur est survenue lors de la création de votre compte.", "error");
		}
	};

	const VisibilityIconComponent = mustShowPassword ? VisibilityIcon : VisibilityOffIcon;

	return (
		<div className="flex flex-col gap-2 p-16 h-screen justify-center">
			<Title
				title="Inscription"
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
			<p>Mot de passe (6+ caractères) :</p>
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
						: "Créer mon compte"
				}
			</Button>
			<Button
				onClick={() => navigate("/sign-in")}
				color="secondary"
				disabled={isLoading}
			>
				Me connecter
			</Button>
		</div>
	);
};