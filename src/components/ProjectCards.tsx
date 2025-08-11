import { DonationCardComponent } from './DonationCardComponent.tsx';

export type CardProps = {
  currentAmount: number;
  startAmount: number;
  endAmount: number;
  peopleGroups: number;
  region: string;
  projectHeader: string;
  projectDescription: string;
  projectBullets: string[];
};

export const ProjectCards = ({ projectData }: { projectData: CardProps[] }) => {
  return (
    <>
      {projectData.map((data, index) => (
        <DonationCardComponent key={index} projectData={data} />
      ))}
    </>
  );
};
