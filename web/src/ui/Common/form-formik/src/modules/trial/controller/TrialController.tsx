interface Props {
  children: (data: {
    submit: (values: any) => Promise<any> | null;
  }) => JSX.Element | null;
}

const TrialController = (props: Props) => {
  const submit = async (values: any) => {
    console.log("test", values);
    return null;
  };

  return props.children({ submit });
};

export default TrialController;
