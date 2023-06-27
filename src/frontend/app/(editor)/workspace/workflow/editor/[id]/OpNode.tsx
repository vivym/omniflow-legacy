import { memo, FC, CSSProperties } from 'react'
import { Handle, Position, NodeProps, NodeResizer } from 'reactflow'

const sourceHandleStyleA: CSSProperties = { top: 50 }
const sourceHandleStyleB: CSSProperties = {
  bottom: 50,
  top: 'auto',
}

const OpNode: FC<NodeProps> = ({ data, xPos, yPos }) => {
  return (
    <>
      <Handle type="target" position={Position.Left} />

      <div>
        <div>
          Label: <strong>{data.label}</strong>
        </div>
        <div>
          Position:{' '}
          <strong>
            {xPos.toFixed(2)},{yPos.toFixed(2)}
          </strong>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={sourceHandleStyleA}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={sourceHandleStyleB}
      />
    </>
  )
}

export default memo(OpNode)
