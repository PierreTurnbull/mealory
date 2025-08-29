import { Page } from "../../common/Page/Page";
import { UpdateShoppingList } from "../../features/planning/UpdateShoppingList/UpdateShoppingList";

export const ShoppingList = () => {
	return (
		<Page
			title="Liste de courses"
		>
			<UpdateShoppingList />
		</Page>
	);
};