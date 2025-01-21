import { BlogPostCreator, DataScientist, GitExpert_Commits, VoiceMemoProcessor, RelationshipCoach } from './customPurposesData';
import { SystemPurposeData } from './data';

const defaultTools = `
Knowledge cutoff: {{Cutoff}}
Current date: {{LocaleNow}}

{{RenderMermaid}}
{{RenderPlantUML}}
{{RenderSVG}}
{{PreferTables}}
`;

const SYSTEM_PURPOSES = ['VoiceMemoProcessor', 'BlogPostCreator', 'DataScientist', 'GitExpert_Commits', 'RelationshipCoach'] as const;

export type CustomSystemPurposes = (typeof SYSTEM_PURPOSES)[number];
type SystemPurposes = Record<CustomSystemPurposes, SystemPurposeData>;

export const getCustomSystemPurpose = (customSystemPurpose: CustomSystemPurposes): SystemPurposeData => {
  const systemPurposeData = { ...systemPurposes[customSystemPurpose] };
  if (!systemPurposeData?.systemMessage) {
    throw new Error(`Custom system purpose "${customSystemPurpose}" does not exist or have a system message.`);
  }
  systemPurposeData.systemMessage += defaultTools;
  return systemPurposeData;
};

const systemPurposes: SystemPurposes = {
  VoiceMemoProcessor,
  BlogPostCreator,
  DataScientist,
  GitExpert_Commits,
  RelationshipCoach,
};
