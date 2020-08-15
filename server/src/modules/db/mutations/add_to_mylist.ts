import { MyList } from "../../../entity/MyList";
export const add_to_mylist = async (_, args, {}) => {
  const { email, show_id, show_name } = args;
  const response = await MyList.findOne({ where: { show_id } });
  if (!response) {
    const myList = MyList.create({ email, show_id, show_name });
    await myList.save();
    return { message: "Show has been added to My List" };
  }
  return { message: "Show is already added to My List" };
};
