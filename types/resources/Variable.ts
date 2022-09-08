import { RelLink } from "../util";

export interface Variable {
	id: string;
	name: string;
	category: string | null;
	scope: VariableScope;
	mandatory: boolean;
	"user-defined": boolean;
	obsoletes: boolean;
	values: VariableValues;
	"is-subcategory": boolean;
	links: RelLink<"self" | "game" | "category">[];
}

export interface VariableScopeSingleLevel {
	type: "single-level";
	level: string;
}

export interface VariableScopeGeneral {
	type: "global" | "full-game" | "all-levels";
}

export type VariableScope = VariableScopeSingleLevel | VariableScopeGeneral;

export interface VariableValue {
	label: string;
	rules: string | null;
	flags: {
		miscellaneous: boolean | null;
	}
}

export interface VariableValues {
	values: Record<string, VariableValue>;
	default: string | null;
}