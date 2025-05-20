export const submitSimpleForm = async (formData: FormData) => {
    // simulasi API POST
    const data = Object.fromEntries(formData.entries());
    console.log("Submitted:", data);
    return { success: true };
  };
  