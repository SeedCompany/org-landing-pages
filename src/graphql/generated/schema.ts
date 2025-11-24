export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Birthday: { input: unknown; output: unknown; }
  DateInterval: { input: unknown; output: unknown; }
  DateTime: { input: unknown; output: unknown; }
  Duration: { input: unknown; output: unknown; }
  EditorJsJSON: { input: unknown; output: unknown; }
  EmailAddress: { input: unknown; output: unknown; }
  JMESPath: { input: unknown; output: unknown; }
  JSON: { input: unknown; output: unknown; }
  JSONObject: { input: unknown; output: unknown; }
  LocalDate: { input: unknown; output: unknown; }
  PaginationCursor: { input: unknown; output: unknown; }
  PercentageDecimal: { input: unknown; output: unknown; }
  PositivePercentageDecimal: { input: unknown; output: unknown; }
  URL: { input: string; output: string; }
  YearQuarter: { input: unknown; output: unknown; }
};

/** The type of investor branding */
export type Brand =
  | 'IllumiNations'
  | 'SeedCompany';

export type Captcha = {
  readonly v2?: InputMaybe<Scalars['String']['input']>;
  readonly v3?: InputMaybe<Scalars['String']['input']>;
};

export type CardBrand =
  | 'AmericanExpress'
  | 'DinerClub'
  | 'Discover'
  | 'JCB'
  | 'MasterCard'
  | 'Unknown'
  | 'Visa';

export type CardExpirationInput = {
  readonly month: Scalars['Int']['input'];
  readonly year: Scalars['Int']['input'];
};

export type CardFundingType =
  | 'Credit'
  | 'Debit'
  | 'Prepaid'
  | 'Unknown';

export type ContactCorrespondenceInput = {
  readonly investor: CreateInvestor;
  readonly message?: InputMaybe<Scalars['String']['input']>;
  readonly subject?: InputMaybe<Scalars['String']['input']>;
  readonly task?: InputMaybe<CreateSalesforceTask>;
  readonly telemetry?: InputMaybe<Telemetry>;
};

export type ContactPreferencesInput = {
  readonly methods?: InputMaybe<ReadonlyArray<PreferredContactMethod>>;
  readonly times?: InputMaybe<ReadonlyArray<PreferredContactTime>>;
};

export type CreateInvestor = {
  readonly birthday?: InputMaybe<Scalars['Birthday']['input']>;
  readonly contactPreferences?: InputMaybe<ContactPreferencesInput>;
  readonly email: Scalars['EmailAddress']['input'];
  readonly firstName?: InputMaybe<Scalars['String']['input']>;
  /**
   * give groups are just an Account we use to
   * aggregate other accounts and contacts
   */
  readonly giveGroup?: InputMaybe<Scalars['ID']['input']>;
  readonly lastName?: InputMaybe<Scalars['String']['input']>;
  readonly mailingAddress?: InputMaybe<MailingAddressInput>;
  readonly name?: InputMaybe<Scalars['String']['input']>;
  readonly ownerId?: InputMaybe<Scalars['ID']['input']>;
  readonly phone?: InputMaybe<Scalars['String']['input']>;
  readonly type?: InvestorType;
};

export type CreatePrayerCommitmentInput = {
  readonly investor: CreateInvestor;
  readonly organization?: InputMaybe<Scalars['String']['input']>;
  readonly task?: InputMaybe<CreateSalesforceTask>;
  readonly telemetry?: InputMaybe<Telemetry>;
};

export type CreateSalesforceTask = {
  readonly description?: InputMaybe<Scalars['String']['input']>;
  readonly priority?: InputMaybe<Scalars['String']['input']>;
  readonly status?: InputMaybe<Scalars['String']['input']>;
  readonly type: Scalars['String']['input'];
};

export type CreateStripePaymentMethodInput = {
  readonly confirmationToken?: InputMaybe<Scalars['String']['input']>;
  /** Whether this should become the investor's default payment method */
  readonly default?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether we should save this payment method for the investor */
  readonly save?: InputMaybe<Scalars['Boolean']['input']>;
  readonly token?: InputMaybe<Scalars['String']['input']>;
};

export type DateTimeFormat =
  | 'Human'
  | 'ISO';

export type DonateInput = {
  readonly cadence: DonationCadence;
  readonly captcha?: InputMaybe<Captcha>;
  readonly investor: CreateInvestor;
  /** Optional memo line from the donor. */
  readonly memo?: InputMaybe<Scalars['String']['input']>;
  /** How this donation is being paid for. */
  readonly payment: PaymentMethodInput;
  readonly targets: ReadonlyArray<DonationTargetInput>;
  readonly telemetry?: InputMaybe<Telemetry>;
};

export type DonationCadence =
  | 'Monthly'
  | 'OneTime';

export type DonationIntent = {
  /**
   * Free form input to try to describe where to give to that will be manually matched.
   * Also called "memo line" or "comment field"
   */
  readonly custom?: InputMaybe<Scalars['String']['input']>;
  /** A Department ID */
  readonly deptId?: InputMaybe<Scalars['String']['input']>;
  /** A GAU ID */
  readonly gau?: InputMaybe<Scalars['String']['input']>;
  /** A predefined code that represents something to give to */
  readonly giveCode?: InputMaybe<Scalars['String']['input']>;
  /** label that our website gives that we store */
  readonly label?: InputMaybe<Scalars['String']['input']>;
  /** A CORD Project ID */
  readonly project?: InputMaybe<Scalars['String']['input']>;
};

export type DonationSubscriptionStatus =
  | 'Active'
  | 'Canceled';

export type DonationTargetInput = {
  readonly amount: Scalars['Int']['input'];
  readonly intent?: InputMaybe<DonationIntent>;
};

/** The size of the expedition trip party */
export type ExpeditionTripPartySize =
  | 'Couple'
  | 'Family'
  | 'Single';

/** The region of the expedition trip */
export type ExpeditionTripRegion =
  | 'Custom'
  | 'Peru'
  | 'SouthernAfrica'
  | 'Tanzania';

/** The season of the expedition trip */
export type ExpeditionTripSeason =
  | 'Fall'
  | 'Spring'
  | 'Summer'
  | 'Winter';

export type Gender =
  | 'Female'
  | 'Male';

export type GlobalTranslationLeaderOrder = {
  readonly direction: OrderDirection;
  readonly field: GlobalTranslationLeaderOrderField;
};

export type GlobalTranslationLeaderOrderField =
  | 'Focus'
  | 'Id'
  | 'Name'
  | 'Program'
  | 'Region'
  | 'ShortCode';

export type ImpactReportOrder = {
  readonly direction: OrderDirection;
  readonly field: ImpactReportOrderField;
};

export type ImpactReportOrderField =
  | 'Quarter';

export type InternshipProgram =
  | 'CapacityBuilding'
  | 'QualityAssurance';

export type InvestorAccountOrder = {
  readonly direction: OrderDirection;
  readonly field: InvestorAccountOrderField;
};

export type InvestorAccountOrderField =
  | 'Id'
  | 'LastName'
  | 'Name';

export type InvestorAccountStatus =
  | 'ParkingLot'
  | 'Portfolio'
  | 'Top50'
  | 'Watchlist';

export type InvestorTripAcceptanceInput = {
  readonly attendees?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  readonly investor: CreateInvestor;
  readonly preferences: InvestorTripPreferencesInput;
  readonly trip: Scalars['String']['input'];
};

export type InvestorTripDeclinationInput = {
  readonly investor: CreateInvestor;
  readonly trip: Scalars['String']['input'];
};

export type InvestorTripInterestInput = {
  readonly investor: CreateInvestor;
  readonly preferences: InvestorTripInterestPreferencesInput;
  readonly trip: Scalars['String']['input'];
};

export type InvestorTripInterestPreferencesInput = {
  /** Investor's desired trip experience limited to 255 characters */
  readonly desiredExperience: Scalars['String']['input'];
  readonly partySize: ExpeditionTripPartySize;
  readonly regions: ReadonlyArray<ExpeditionTripRegion>;
  readonly seasons: ReadonlyArray<ExpeditionTripSeason>;
};

export type InvestorTripPreferencesInput = {
  readonly accessibilityAssistance: Scalars['Boolean']['input'];
  readonly activePassport: Scalars['Boolean']['input'];
  readonly dietaryRestrictions: Scalars['Boolean']['input'];
  readonly healthRequirements: Scalars['Boolean']['input'];
};

export type InvestorType =
  | 'Individual'
  | 'Organization';

export type MailingAddressInput = {
  /** City/Suburb/Town/Village */
  readonly city?: InputMaybe<Scalars['String']['input']>;
  /** 2-letter country code */
  readonly country?: InputMaybe<Scalars['String']['input']>;
  /** Address line 1 (Street address/PO Box/Company name) */
  readonly line1?: InputMaybe<Scalars['String']['input']>;
  /** Address line 2 (Apartment/Suite/Unit/Building) */
  readonly line2?: InputMaybe<Scalars['String']['input']>;
  /** State/Province/County */
  readonly state?: InputMaybe<Scalars['String']['input']>;
  /** Zip/Postal Code */
  readonly zip?: InputMaybe<Scalars['String']['input']>;
};

export type NewsletterCorrespondenceInput = {
  readonly investor: CreateInvestor;
  readonly telemetry?: InputMaybe<Telemetry>;
};

/** An order direction either ascending or descending */
export type OrderDirection =
  | 'ASC'
  | 'DESC';

/** one of the three is required */
export type PaymentMethodInput = {
  readonly saved?: InputMaybe<SavedPaymentMethodRef>;
  readonly stripe?: InputMaybe<CreateStripePaymentMethodInput>;
};

/** Type of payment method; either a card or a bank account */
export type PaymentMethodType =
  | 'BankAccount'
  | 'Card';

export type PreferredContactMethod =
  | 'Email'
  | 'Phone'
  | 'Text';

export type PreferredContactTime =
  | 'Afternoon'
  | 'Evening'
  | 'Morning';

/**
 * How the product is delivered.
 *
 * This is independent of how the translation is done.
 */
export type ProductMedium =
  | 'App'
  | 'Audio'
  /** @label E-Book */
  | 'EBook'
  | 'Other'
  | 'Print'
  | 'TrainedStoryTellers'
  | 'Video'
  | 'Web';

export type QuarterlyInvestorImpactReportStatus =
  | 'NotReady'
  | 'Ready'
  | 'Shared';

export type QueueJobState =
  | 'Active'
  | 'Completed'
  | 'Delayed'
  | 'Failed'
  | 'Paused'
  | 'Prioritized'
  | 'Repeat'
  | 'Unknown'
  | 'Wait'
  | 'Waiting'
  | 'WaitingChildren';

export type ReportInquiryCorrespondenceInput = {
  readonly investor: CreateInvestor;
  readonly telemetry?: InputMaybe<Telemetry>;
  readonly type: Scalars['String']['input'];
  readonly year: Scalars['Int']['input'];
};

export type SavedPaymentMethodRef = {
  readonly id: Scalars['ID']['input'];
};

export type ScheduleStatus =
  | 'Ahead'
  | 'Behind'
  | 'OnTime';

export type Sensitivity =
  | 'High'
  | 'Low'
  | 'Medium';

/** The type of investor sharing */
export type Sharing =
  | 'Email'
  | 'Link'
  | 'Print';

export type Telemetry = {
  /** Name of the calling app, i.e. Pray For Zero */
  readonly app?: InputMaybe<Scalars['String']['input']>;
  /** Name of the calling feature, i.e. Contact Us Form */
  readonly feature?: InputMaybe<Scalars['String']['input']>;
  /**
   * How the user got to this feature.
   * Maybe a url to a campaign landing page.
   * Maybe just a campaign name.
   * Also, Campaign short codes
   */
  readonly referrer?: InputMaybe<Scalars['String']['input']>;
  readonly sourceName?: InputMaybe<Scalars['String']['input']>;
  /** URL of the calling app, i.e. https://seedcompany.com/contact-us */
  readonly sourceUrl?: InputMaybe<Scalars['URL']['input']>;
};

export type UpdateImpactReportInput = {
  readonly investorId: Scalars['ID']['input'];
  readonly reportDate: Scalars['LocalDate']['input'];
};

export type UpdateImpactReportSharingInput = {
  readonly investorId: Scalars['ID']['input'];
  readonly reportDate?: InputMaybe<Scalars['DateTime']['input']>;
  readonly sharing: Sharing;
};

export type UpdateInvestorInput = {
  readonly firstName?: InputMaybe<Scalars['String']['input']>;
  readonly lastName?: InputMaybe<Scalars['String']['input']>;
  readonly mailingAddress?: InputMaybe<MailingAddressInput>;
  readonly phone?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePaymentMethodInput = {
  readonly address?: InputMaybe<MailingAddressInput>;
  readonly default: Scalars['Boolean']['input'];
  readonly expiration?: InputMaybe<CardExpirationInput>;
  readonly id: Scalars['ID']['input'];
  readonly name?: InputMaybe<Scalars['String']['input']>;
};
