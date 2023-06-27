'use client'

import { useCallback, useRef, useState, DragEvent } from 'react'
import ReactFlow, {
  Background,
  Node,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Controls,
  Edge,
  ConnectionLineType,
  MiniMap,
  Panel,
  ReactFlowInstance,
} from 'reactflow'
import {
  BeakerIcon,
  CircleStackIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/outline'
import classNames from 'classnames'

import OpNode from './OpNode'

const navigation = [
  {
    name: '控制流',
    icon: BeakerIcon,
    subNavigations: [
      { name: '条件判断' },
      { name: '循环' },
      { name: '随机选择' },
    ],
  },
  {
    name: '文本处理',
    icon: CircleStackIcon,
    subNavigations: [
      { name: '文本分割' },
      { name: '文本合并' },
    ],
  },
  {
    name: 'AI大语言模型',
    icon: CircleStackIcon,
    subNavigations: [
      { name: 'ChatGPT 3.5' },
      { name: 'ChatGPT 4' },
      { name: 'ChatGLM' },
    ],
  },
]

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 },
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: { label: 'Node 3' },
    position: { x: 400, y: 100 },
  },
  {
    id: '4',
    data: { label: 'Node 4' },
    position: { x: 400, y: 200 },
    type: 'op',
    className: 'border rounded-md shadow-md p-5',
  },
]

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
]

const nodeTypes = {
  op: OpNode,
}

const defaultEdgeOptions = {
  animated: true,
  type: 'smoothstep',
}

let id = 0
const getId = () => `node_${id++}`

export default function WorkflowEditorPage({ params }: { params: { id: string }}) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null)

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const onDragStart = (event: DragEvent<HTMLAnchorElement>, nodeType: string) => {
    if (event.dataTransfer) {
      event.dataTransfer.setData('application/reactflow', nodeType)
      event.dataTransfer.effectAllowed = 'move'
    }
  }

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer!.dropEffect = 'move'
  }

  const onDrop = useCallback((event: DragEvent) => {
    event.preventDefault()

    if (reactFlowInstance == null || reactFlowWrapper.current == null) {
      return
    }
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
    const type = event.dataTransfer.getData('application/reactflow')

    if (typeof type === 'undefined' || !type) {
      return
    }

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${type} node` },
    };

    setNodes((nds) => nds.concat(newNode));
  }, [])

  return (
    <div className="flex-1 flex-grow flex" ref={reactFlowWrapper}>
      {/* !h-auto: Override height: 100% */}
      <ReactFlow
        className="flex-1 !h-auto"
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        nodeTypes={nodeTypes}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDragOver={onDragOver}
        onDrop={onDrop}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      >
        <Background />
        <Panel
          position="top-left"
          className="bg-white border border-gray-200 rounded-md shadow-md p-4 !m-2"
        >
          <div className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href="#"
                        className={classNames(
                          'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                          'group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                        )}
                      >
                        <item.icon
                          className={classNames(
                            'text-gray-400 group-hover:text-indigo-600',
                            'h-6 w-6 shrink-0',
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                        {item.subNavigations.length > 0 && (
                          <ChevronLeftIcon className="h-5 w-5 shrink-0 ml-auto" aria-hidden="true" />
                        )}
                      </a>
                      {/* TODO: Add animation */}
                      {item.subNavigations.length > 0 && (
                        <ul role="list" className="space-y-1">
                          {item.subNavigations.map((subItem) => (
                            <li key={item.name + subItem.name}>
                              <a
                                href="#"
                                className={classNames(
                                  'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                  'group flex pl-14 pr-14 rounded-md py-2 text-sm leading-6 font-semibold',
                                  'cursor-grab',
                                )}
                                draggable
                                onDragStart={(event) => onDragStart(event, subItem.name)}
                              >
                                {subItem.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </Panel>
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  )
}
