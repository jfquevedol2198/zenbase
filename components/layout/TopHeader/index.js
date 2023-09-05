import Text from "components/text";

export default function TopHeader(props) {
  const { title = "" } = props;
  return (
    <Text fontSize="32" fontWeight="bold" >
      {title}
    </Text>
  );
}
