import {
  BezierEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from "@xyflow/react";

const CustomEdge = (props: EdgeProps) => {
  const {
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    source,
    target,
  } = props;

  const [_edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const { setNodes } = useReactFlow();

  const onAddNode = () => {
    setNodes((prevNodes) =>
      // const index = prevNodes.findIndex((node) => node.id === target);
      // const sourceNode = prevNodes.find((node) => node.id === source);
      // if (sourceNode) {
      //   prevNodes.splice(index + 1, 0, {
      //   id: `${prevNodes.length + 1}`,
      //   type: "action",
      //   position: {
      //     x: sourceNode.position.x,
      //     y: sourceNode.position.y + 400,
      //   },
      //   data: { label: "Action" },
      // });
      // }
      // console.log(prevNodes);
      // return prevNodes;
      [
        ...prevNodes,
        {
          id: `${prevNodes.length + 1}`,
          type: "action",
          position: {
            x: 100,
            y: 600,
          },
          data: { label: "Action" },
        },
      ]
    );
  };

  return (
    <>
      <BezierEdge {...props} />
      <EdgeLabelRenderer>
        <div
          className="absolute bg-background rounded-full p-0.5"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
          onClick={onAddNode}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3e4693"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-plus cursor-pointer"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
