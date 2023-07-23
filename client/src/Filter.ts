interface FilterData {
	name: string;
	strength: number;
}

// Find valid filter names here: https://wiki.rage.mp/index.php?title=Timecycle_Modifiers
export enum FilterType {
	Blur = 'hud_def_blur',
}

export default class Filter {
	private static currentFilter?: FilterData;
	private static currentExtraFilter?: FilterData;

	public static get Current(): FilterData | undefined {
		return this.currentFilter;
	}

	public static get CurrentExtra(): FilterData | undefined {
		return this.currentExtraFilter;
	}

	public static set Current(filter: FilterData) {
		this.currentFilter = filter;
		SetTimecycleModifier(filter.name);
		SetTimecycleModifierStrength(filter.strength);
	}

	public static set CurrentExtra(filter: FilterData) {
		this.currentExtraFilter = filter;
		SetExtraTimecycleModifier(filter.name);
		SetExtraTimecycleModifierStrength(filter.strength);
	}

	public static Clear() {
		delete this.currentFilter;
		ClearTimecycleModifier();
	}

	public static ClearExtra() {
		delete this.currentExtraFilter;
		ClearExtraTimecycleModifier();
	}

	public static ClearAll() {
		this.Clear();
		this.ClearExtra();
	}
}
