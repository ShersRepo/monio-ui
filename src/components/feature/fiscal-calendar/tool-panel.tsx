import React from 'react';
import { Box, CollapsibleContent, CollapsibleRoot, CollapsibleTrigger, For } from '@chakra-ui/react';
import ToolPanelNewForm from '@/components/feature/fiscal-calendar/tool-panel-fiscal-item-form';

export interface FiscalToolPanelMenu {
	title: string;
	content: React.ReactNode;
	defaultOpen?: boolean;
	icon?: string;
}

const MOCK_TOOL_PANEL_ITEM: FiscalToolPanelMenu[] = [
	{
		title: "Add new item",
		content: <ToolPanelNewForm></ToolPanelNewForm>,
		defaultOpen: true,
	},
	{
		title: "Drafts",
		content: "Shows the draft creations which aren't set to active",
		defaultOpen: true,
	},
	{
		title: "Current View",
		content: "Show the items in the current period",
		defaultOpen: false,
	}
]

function PanelHeader({title}: Readonly<{title: string}>): React.ReactNode {
	return (
		<Box
			padding={"4"}
			bgColor={"cyan.700"}
			color={"gray.200"}
			borderRadius={"2px"}
			textAlign={"start"}
			cursor={"pointer"}
			marginBottom={"10px"}

		>
			{title}
		</Box>
	)
}

function PanelContentWrapper({content}: Readonly<{content: React.ReactNode}>): React.ReactNode {
	return (
		<Box
			padding={"4"}
			borderColor={"gray.200"}
			borderWidth={"1px"}
			borderBottomWidth={"0px"}
			borderTopWidth={"0px"}
			borderRadius={"2px"}
			textAlign={"start"}
			marginBottom={"10px"}
		>
			{content}
		</Box>
	)
}

function FiscalToolPanelItem({item}: Readonly<{item: FiscalToolPanelMenu}>): React.ReactNode {

	return (
		<CollapsibleRoot defaultOpen={item.defaultOpen}>

			<CollapsibleTrigger w={"full"}>

				<PanelHeader title={item.title}></PanelHeader>
			</CollapsibleTrigger>

			<CollapsibleContent>

				<PanelContentWrapper content={item.content}></PanelContentWrapper>
			</CollapsibleContent>
		</CollapsibleRoot>
	)
}

export default function FiscalCalendarToolPanel(): React.ReactNode {


	return (
		<Box>
			<For each={MOCK_TOOL_PANEL_ITEM}>
				{
					(item) => <FiscalToolPanelItem key={item.title} item={item}></FiscalToolPanelItem>
				}
			</For>
		</Box>
	)

}