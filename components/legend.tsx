import { PocIcon } from './pocIcon';

export type LegendOption = {
    value: string;
    label: string;
};

interface LegendProps {
    pocFilters: Record<string, boolean>;
    togglePocFilter: (filter: string) => void;
    options: [LegendOption, LegendOption];
}

export const Legend = ({ pocFilters, togglePocFilter, options }: LegendProps) => (
    <div className="rounded p-[10px]">
        <button
            type="button"
            className={`flex items-center space-x-2 cursor-pointer ${
                pocFilters[options[0].value] ? 'none' : 'line-through'
            }`}
            onClick={() => togglePocFilter(options[0].value)}
        >
            <PocIcon fill="white" />
            <div>{options[0].label}</div>
        </button>
        <button
            type="button"
            className={`flex items-center space-x-2 cursor-pointer ${
                pocFilters[options[1].value] ? 'none' : 'line-through'
            }`}
            onClick={() => togglePocFilter(options[1].value)}
        >
            <PocIcon fill="#81859B" />
            <div>{options[1].label}</div>
        </button>
    </div>
);
