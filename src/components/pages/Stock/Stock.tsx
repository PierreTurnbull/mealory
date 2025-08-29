import { Page } from "../../common/Page/Page";
import { UpdateStock } from "../../features/planning/UpdateStock/UpdateStock";

export const Stock = () => {
	return (
		<Page
			title="Gestion des stocks"
		>
			<div className="space-y-4">
				<p>Indiquez le nombre d'ingrédients que vous possédez déjà afin de les enlever de la liste de courses.</p>
				<UpdateStock />
			</div>
		</Page>
	);
};