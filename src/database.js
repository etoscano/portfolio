import { createRef } from "react"

const state = {
  sections: 6,
  pages: 6,
  zoom: 75,
  paragraphs: [
    {
      index: 0,
      factor: 1.75,
      header: "District 4",
      image: "/textures/buildings/b_1.jpeg",
      aspect: 1.50,
      text: "Two thousand pharmacologists and bio-chemists were subsidized. Six years later it was being produced commercially."
    },
    {
      index: 1,
      factor: 2.0,
      header: "Diamond Road",
      image: "/textures/buildings/b_1.jpeg",
      aspect: 1.50,
      text:
        "The man who comes back through the Door in the Wall will never be quite the same as the man who went out. He will be wiser but less sure, happier but less self-satisfied, humbler in acknowledging his ignorance yet better equipped to understand the relationship of words to things, of systematic reasoning to the unfathomable mystery which it tries, forever vainly, to comprehend."
    },
    {
      index: 2,
      factor: 2.25,
      header: "Catalina",
      image: "/textures/buildings/b_1.jpeg",
      aspect: 1.50,
      text:
        "The substance can take you to heaven but it can also take you to hell. Or else to both, together or alternately. Or else (if you're lucky, or if you've made yourself ready) beyond either of them. And then beyond the beyond, back to where you started from — back to here, back to New Rotham sted, back to business as usual. Only now, of course, business as usual is completely different."
    },
    {
      index: 3,
      factor: 2.0,
      header: "Building 21",
      image: "/textures/buildings/b_1.jpeg",
      aspect: 1.50,
      text:
        "We’ve found that the people whose EEG doesn’t show any alpha-wave activity when they’re relaxed aren’t likely to respond significantly to the substance. That means that, for about fifteen percent of the population, we have to find other approaches to liberation."
    },
    {
      index: 4,
      factor: 1.75,
      header: "Sector 8",
      image: "/textures/buildings/b_1.jpeg",
      aspect: 1.50,
      text:
        "By cultivating the state of mind that makes it possible for the dazzling ecstatic insights to become permanent and habitual illuminations. By getting to know oneself to the point where one won’t be compelled by one’s unconscious to do all the ugly, absurd, self-stultifying things that one so often finds oneself doing."
    },
    { index: 5, factor: 1.05, header: "The Factory", image: "/textures/buildings/b_1.jpeg", aspect: 1.50, text: "Education and enlightenment." }
  ],
  stripes: [
    { index: 0, color: "#000", height: 13 },
    { index: 6.3, color: "#000", height: 20 }
  ],
  buildings: [
    { index: 0, image: "/textures/buildings/b_1.png" },
    { index: 1, image: "/textures/buildings/b_2.png" },
    { index: 2, image: "/textures/buildings/b_3.png" },
    { index: 3, image: "/textures/buildings/b_4.png" },
    { index: 4, image: "/textures/buildings/b_5.png" },
    { index: 5, image: "/textures/buildings/b_6.png" },
    { index: 6, image: "/textures/buildings/b_7.png" },
    { index: 7, image: "/textures/buildings/b_8.png" },
    { index: 8, image: "/textures/buildings/b_9.png" }
  ],
  top: createRef()
}

export default state
