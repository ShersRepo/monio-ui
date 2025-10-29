import { useFiscalItemDraftProvider } from '@/app/budget-planner/provider/fiscal-item-draft-provider';
import { For } from '@chakra-ui/react';
import React ,{ useEffect }from 'react';


export default function ToolPanelDraftList() {

	const { fiscalItemInEdit, setFiscalItemInEdit, fiscalItems } = useFiscalItemDraftProvider();

	return (
		<div>
			<p>Shows the draft creations which aren't set to active</p>
			<For each={fiscalItems}>
				{
					(item) => <div key={item.name}>{item.name}</div>
				}
			</For>
		</div>
	)

}