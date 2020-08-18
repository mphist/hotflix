import { MyList } from "../../../entity/MyList";
export const add_to_mylist = async (_, args, {}) => {
  const { email, show_id, show_title } = args;
  const response = await MyList.findOne({ where: { show_id } });
  if (!response) {
    console.log("adding to list", show_id, show_title);
    const myList = MyList.create({ email, show_id, show_title });
    await myList.save();
    return { message: "Show has been added to My List" };
  }
  return { message: "Show is already added to My List" };
};
