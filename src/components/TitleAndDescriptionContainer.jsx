import TitleAndDescription from "./TitleAndDescription";

const TitleandDescriptionContainer = () => {
  return (
    <>
      <TitleAndDescription
        title="Demon"
        description="Tap into our deepest fears and religious beliefs. What's evil, torment or eternal damnation? 
            This realm evokes a fear of punishment, spiritual darkness, and the possibility of losing one's soul. 
            Face the uncertainty of what lies beyond death and the dread of facing the consequences of our actions in the afterlife."
        styleTitle="firstTitle"
        styleDescription="firstDescription"
      />
      <TitleAndDescription
        title="Cthulhu"
        description="“That is not dead which can eternal lie,
            And with strange aeons even death may die”"
        styleTitle="secondTitle"
        styleDescription="secondDescription"
      />
      <TitleAndDescription
        title="Alien"
        description="It's unfamiliar appearance and advanced capabilities challenge our understanding of the universe, 
            triggering feelings of vulnerability and insignificance. Get to know their intentions, the potential for invasion 
            or abduction, and the unsettling realization that we may not be alone in the vastness of space"
        styleTitle="thirdTitle"
        styleDescription="thirdDescription"
      />
      <TitleAndDescription
        title="Mushroom"
        description="An eerie environment where the line between beauty and danger becomes blurred,
            as if you had stepped into a realm where nature's secrets whispered of danger and the unknown."
        styleTitle="fourthTitle"
        styleDescription="fourthDescription"
      />
      <TitleAndDescription
        title="Drácula"
        description="Whats more scary than his immortal existence?
            His insatiable thirst for blood, his charisma, supernatural powers
            - a relentless predator, immortal and insatiable"
        styleTitle="fifthTitle"
        styleDescription="fifthDescription"
      />
    </>
  )
}

export default TitleandDescriptionContainer;
