interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

interface CourseDescriptionBase extends CoursePartBase {
    description: string;
  }

interface CoursePartBasic extends CourseDescriptionBase {
    kind: 'basic';
  }

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: 'group';
  }

interface CoursePartBackground extends CourseDescriptionBase {
    backgroundMaterial: string;
    kind: 'background';
  }

  interface CoursePartSpecial extends CourseDescriptionBase {
    requirements: string[];
    kind: 'special';
  }

  
export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial