const styles = {
  boxWidth: "xl:max-w-[1280px] w-full",

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-start items-start",

  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",

  marginX: "sm:mx-16 mx-6",
  marginY: "sm:my-16 my-6",

  // Add this for consistent navbar height across pages
  navbarHeight: "h-[80px]", // Example height, adjust as necessary
};

export const layout = {
  section: `flex md:flex-row flex-col ${styles.paddingY}`,
  sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

  sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
  sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

  sectionInfo: `flex-1 ${styles.flexStart} flex-col`,

  // Add layout style for the navbar
  navbar: `w-full ${styles.boxWidth} ${styles.flexCenter} ${styles.navbarHeight} px-6`, 
};

export default styles;
