/* eslint-disable @typescript-eslint/naming-convention */
import {
    ChartLine,
    Laptop,
    ListNumbers,
    Package,
    Sparkle,
    Storefront,
    Truck,
} from 'phosphor-react';
import moment, { Moment } from 'moment';
// import { SkuInfo } from '../../../hooks/helm/useSkuInfo';
// import { StrategyOverviewPartial } from '../../../hooks/helm/useStrategyOverview';
// import { StrategyDetails } from '../../../hooks/helm/useStrategyDetails';
// import { capFirstLetterAndLowerOthers } from '../../../utils/productFilters';
// import { PreviewSummary } from '../../../hooks/helm/usePreviewSummary';
// import { PrePilotTaskMetrics } from '../../../hooks/helm/usePrepilotTaskMetrics';

export const utcMoment = (str: string | Date | Moment = new Date()) => moment.utc(str);

export const seasonalDiffWithDayMatch = (date: string | Moment) => {
    const newDate = utcMoment(date);
    const dayOfWeek = newDate.day();

    const oneYearAgo = newDate.clone().subtract(1, 'years');

    while (oneYearAgo.day() !== dayOfWeek) {
        oneYearAgo.add(1, 'days');
    }

    return oneYearAgo;
};




export enum SiteModes {
    Oracle = 'Oracle',
    Agent = 'Agent',
}


export const ALL_PRODUCTS = 'all products';

export enum ClientOptions {
    AlphaC = 'alpha-centauri',
    Neptune = 'neptune',
}

export enum CountryOptions {
    Ecuador = 'EC',
    Phillipines = 'PH',
}

export enum ParentLeverGroup {
    BEES_FORCE = 'BEES Force',
    BEES_GROW = 'BEES Grow',
    BEES_CUSTOMER = 'BEES Customer',
}

export interface Lever {
    name: string;
    group: ParentLeverGroup;
    subGroup?: string;
    defaultOn: boolean;
    disabled: boolean;
}

export enum BEESForceLevers {
    RepRouting = 'Rep Routing',
    RepTasking = 'Rep Tasking',
    POCVisits = 'POC Visits',
    AIGeneratedSellingArguments = 'AI-Generated Selling Arguments',
}

export enum BEESGrowLevers {
    POCPrioritization = 'POC Prioritization',
    MissionPrioritization = 'Mission Prioritization',
    AIGeneratedCallScripts = 'AI-Generated Call Scripts',
}

export enum BEESCustomerLevers {
    SuggestedOrder = 'Suggested Order',
    UpsellPopup = 'Upsell Popup',
    ForgottenItems = 'Forgotten Items',
    TopDeals = 'Top Deals',
    Promos = 'Promos',
    BannerImage = 'Banner Image',

    // digital comms subgroup

    Email = 'Email',
    TextMessageWhatsApp = 'Text Message / WhatsApp',
    PushNotification = 'Push Notification',
    InAppMessaging = 'In-App Messaging',
    InstagramFacebookAds = 'Instagram / Facebook Ads',

    // club b subgroup

    ClubBEarn = 'Earn',
    ClubBRedeem = 'Redeem',
    ClubBChallenge = 'Challenge',
}

export const levers: Lever[] = [
    {
        name: BEESForceLevers.RepRouting,
        group: ParentLeverGroup.BEES_FORCE,
        defaultOn: false,
        disabled: true,
    },
    {
        name: BEESForceLevers.RepTasking,
        group: ParentLeverGroup.BEES_FORCE,
        defaultOn: true,
        disabled: false,
    },
    {
        name: BEESForceLevers.POCVisits,
        group: ParentLeverGroup.BEES_FORCE,
        defaultOn: false,
        disabled: true,
    },
    {
        name: BEESForceLevers.AIGeneratedSellingArguments,
        group: ParentLeverGroup.BEES_FORCE,
        defaultOn: false,
        disabled: true,
    },
    {
        name: BEESCustomerLevers.SuggestedOrder,
        group: ParentLeverGroup.BEES_CUSTOMER,
        defaultOn: true,
        disabled: false,
    },
    {
        name: BEESCustomerLevers.UpsellPopup,
        group: ParentLeverGroup.BEES_CUSTOMER,
        defaultOn: true,
        disabled: false,
    },
    {
        name: BEESCustomerLevers.ForgottenItems,
        group: ParentLeverGroup.BEES_CUSTOMER,
        defaultOn: true,
        disabled: false,
    },
    {
        name: BEESCustomerLevers.TopDeals,
        group: ParentLeverGroup.BEES_CUSTOMER,
        defaultOn: true,
        disabled: false,
    },
    {
        name: BEESCustomerLevers.Promos,
        group: ParentLeverGroup.BEES_CUSTOMER,
        defaultOn: false,
        disabled: true,
    },
    {
        name: BEESCustomerLevers.BannerImage,
        group: ParentLeverGroup.BEES_CUSTOMER,
        defaultOn: false,
        disabled: true,
    },
    {
        name: BEESCustomerLevers.Email,
        group: ParentLeverGroup.BEES_CUSTOMER,
        subGroup: 'Digital Comms',
        defaultOn: false,
        disabled: true,
    },
    {
        name: BEESCustomerLevers.TextMessageWhatsApp,
        group: ParentLeverGroup.BEES_CUSTOMER,
        subGroup: 'Digital Comms',
        defaultOn: false,
        disabled: true,
    },
    {
        name: BEESCustomerLevers.PushNotification,
        group: ParentLeverGroup.BEES_CUSTOMER,
        subGroup: 'Digital Comms',
        defaultOn: true,
        disabled: false,
    },
    {
        name: BEESCustomerLevers.InAppMessaging,
        group: ParentLeverGroup.BEES_CUSTOMER,
        subGroup: 'Digital Comms',
        defaultOn: true,
        disabled: false,
    },

    {
        name: BEESCustomerLevers.InstagramFacebookAds,
        group: ParentLeverGroup.BEES_CUSTOMER,
        subGroup: 'Digital Comms',
        defaultOn: false,
        disabled: true,
    },
    {
        name: BEESCustomerLevers.ClubBEarn,
        group: ParentLeverGroup.BEES_CUSTOMER,
        subGroup: 'Club B',
        defaultOn: false,
        disabled: true,
    },
    {
        name: BEESCustomerLevers.ClubBRedeem,
        group: ParentLeverGroup.BEES_CUSTOMER,
        subGroup: 'Club B',
        defaultOn: false,
        disabled: true,
    },
    {
        name: BEESCustomerLevers.ClubBChallenge,
        group: ParentLeverGroup.BEES_CUSTOMER,
        subGroup: 'Club B',
        defaultOn: false,
        disabled: true,
    },
    {
        name: BEESGrowLevers.POCPrioritization,
        group: ParentLeverGroup.BEES_GROW,
        defaultOn: false,
        disabled: true,
    },
    {
        name: BEESGrowLevers.MissionPrioritization,
        group: ParentLeverGroup.BEES_GROW,
        defaultOn: false,
        disabled: true,
    },
    {
        name: BEESGrowLevers.AIGeneratedCallScripts,
        group: ParentLeverGroup.BEES_GROW,
        defaultOn: false,
        disabled: true,
    },
];

export const disabledLevers = levers.filter(lever => lever.disabled).map(lever => lever.name);



export const helmColors = {
    lightGray: '#e4e4e8',
    lightGray2: '#d7d9de',
    lightGray3: '#EEEEF2',
    gray: '#b1b5c1',
    gray2: '#81859b',
    gray3: '#E4E4E8',
    lightBlue: '#e0e4f6',
    darkBlue: '#345dee',
    darkGreyBlue: '#515674',
    lightGrayBlue: '#f7f9fa',
    lightPink: '#ece5f2',
    pink: '#f11b97',
    yellow: '#EBA338',

    purple: '#6938b9',
    periwinkleBlue: '#c7cdf2',
    skyBlue: '#bdd7e9',
    seafoamGreen: '#c8ded2',
    paleChartreuse: '#dae1c7',
    magenta: '#bb54b5',
    lilac: '#dabcd5',
    lavender: '#e2bfcd',
    rose: '#e6c4c4',
    coral: '#e6cabd',

    red: '#D14E5F',
    crimson: '#e94576',
    green: '#4C9355',
    lightGreen: '#94C544',
};

export const chartColors = {
    baseline: helmColors.gray2,
    target: helmColors.darkBlue,
    metric: helmColors.pink,
    projected: helmColors.pink,
};

export const cardLinearGradient = 'linear-gradient(112.87deg, #F6F8F9 0%, #F2F0F6 100%)';



export enum Mode {
    FullAutonomy = 'Full Autonomy',
    DecisionAssistance = 'Decision Assistance',
    None = 'None',
}

export enum Goal {
    DriveDigitalMaturity = 'Drive Digital Maturity',

    ShiftMix = 'Shift Mix',

    IncreaseRange = 'Increase Range',

    IncreaseCoverage = 'Increase Coverage',
    IntroduceNewProduct = 'Introduce New Product',

    SalesChannelOptimization = 'Sales Channel Optimization',
    GrowVolume = 'Grow Volume',
    GrowRevenue = 'Grow Revenue',
}

export enum StrategyStartTimePeriodOptions {
    Continuous = 'Never (Continuous)',
    After1Month = '1',
    After2Months = '2',
    ChooseSpecificDate = 'Choose Specific Date',
}

export type LeverActiveMap = {
    [ParentLeverGroup.BEES_FORCE]: Record<BEESForceLevers, boolean>;
    [ParentLeverGroup.BEES_GROW]: Record<BEESGrowLevers, boolean>;
    [ParentLeverGroup.BEES_CUSTOMER]: Record<BEESCustomerLevers, boolean>;
};

export type LeverActionsPerPocMap = {
    [ParentLeverGroup.BEES_FORCE]: Partial<Record<BEESForceLevers, number>>;
    [ParentLeverGroup.BEES_GROW]: Partial<Record<BEESGrowLevers, number>>;
    [ParentLeverGroup.BEES_CUSTOMER]: Partial<Record<BEESCustomerLevers, number>>;
};

export const BASE_URL = '/helm';

export interface PreviewStrategyResponse {
    pctPocsSelectedRegions: number;
    prioritized: number;
    deprioritized: number;
    leverActions: Record<ParentLeverGroup, number>;
}

export const defaultLevers = levers.reduce(
    (acc, curr) => {
        const { group, name, defaultOn } = curr;
        acc[group][name] = defaultOn;
        return acc;
    },
    {
        [ParentLeverGroup.BEES_FORCE]: {},
        [ParentLeverGroup.BEES_GROW]: {},
        [ParentLeverGroup.BEES_CUSTOMER]: {},
    },
);

export const channels = [
    'bakery',
    'bar',
    'club',
    'convenience_store',
    'distributor',
    'entertainment',
    'events',
    'fast_food',
    'food_truck',
    'franchise',
    'gas_station',
    'hotels_lodging',
    'liquor_store',
    'pharmacy',
    'restaurant',
    'school',
    'supermarket',
    'other',
];

export enum Channel {
    OffPrem = 'Off-Prem',
    OnPrem = 'On-Prem',
    Distributor = 'Distributor',
}

export const channelTypeMap = {
    bakery: Channel.OnPrem,
    bar: Channel.OnPrem,
    club: Channel.OnPrem,
    convenience_store: Channel.OffPrem,
    distributor: Channel.Distributor,
    entertainment: Channel.OnPrem,
    events: Channel.OnPrem,
    fast_food: Channel.OnPrem,
    food_truck: Channel.OnPrem,
    franchise: Channel.OnPrem,
    gas_station: Channel.OffPrem,
    hotels_lodging: Channel.OnPrem,
    liquor_store: Channel.OffPrem,
    pharmacy: Channel.OffPrem,
    restaurant: Channel.OnPrem,
    school: Channel.OnPrem,
    supermarket: Channel.OffPrem,
    other: null,
};

export const pocSizes = ['A', 'B', 'C', 'D', 'N'];
export const distinctSKUs = ['0', '1-5', '6-10', '11-15', '16-20', '21-25', '26-30', '31+'];

export enum PocGroupBy {
    PocChannelType = 'channel_type',
    PocChannel = 'channel',
    PocSize = 'size',
    ProductMix = 'sku_coverage',
    DigitalMaturity = 'digital-maturity',
}

export const segmentMap: Record<PocGroupBy, string[]> = {
    [PocGroupBy.PocChannel]: channels,
    [PocGroupBy.PocChannelType]: Object.values(Channel),
    [PocGroupBy.PocSize]: pocSizes,
    [PocGroupBy.ProductMix]: distinctSKUs,
    [PocGroupBy.DigitalMaturity]: [],
};

const channelTypeDisplayMap = {
    ON: 'On-Prem',
    OFF: 'Off-Prem',
    WH: 'Wholesaler',
};

export const channelTypeDisplay = (channelType: string) =>
    channelTypeDisplayMap[channelType] || channelType;

export const geos = [
    'Quito',
    'Guayaquil',
    'Costa Norte',
    'Costa Sur',
    'Costa Centro',
    'Sierra Sur',
    'Sierra Oriente',
    'Sierra Centro',
];


export function isToday(date: string) {
    if (!date) return false;
    const inputDate = utcMoment(date);
    const today = utcMoment().startOf('day');
    return inputDate.isSame(today, 'day');
}

export type PocFilters = Record<'included' | 'excluded', boolean>;

export const MOCK_TOTAL_POCS = 235131;
export const MOCK_PRIORITIZED_PCT = 0.64;
/* calls Math.random and returns true 0.5% of the time (this just makes it look kind of right) */
export const mockIsPrioritized = () => Math.random() < MOCK_PRIORITIZED_PCT;

export const EXCLUDED_MYSTERY_OCEAN_POCS_IDS = [
    '11801739', // DISBEBIDASUR CIA. LTDA., Jama, Jama, Manabí
    '12890386', // Jordan Vera, Maria Jose, Manta, Manta, Manabí,
    '13702020',
    '11801635',
    '11801629',
    '11801746',
    '13717570',
    '11801831',
    '11801724',
    '11847876', // in Colombia
];

