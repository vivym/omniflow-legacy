'use client'

import classNames from 'classnames'
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import {
  ListBulletIcon,
  RectangleGroupIcon,
} from '@heroicons/react/24/outline'

const viewModes = [
  { name: '列表', icon: ListBulletIcon, value: 'list' },
  { name: '网格', icon: RectangleGroupIcon, value: 'grid' },
]

const workflows = [
  {
    id: 1,
    name: '工作流1',
    tags: ['标签1', '标签2'],
    updatedAt: '2021-08-01',
  },
  {
    id: 2,
    name: '工作流2',
    tags: ['标签3'],
    updatedAt: '2021-08-01',
  },
]

export default function MinePage() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')

  return (
    <div>
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            我的工作流
          </h2>
        </div>

        <div className="mt-4 flex md:ml-4 md:mt-0">
          <RadioGroup value={viewMode} onChange={setViewMode}>
            <RadioGroup.Label className="sr-only">View mode</RadioGroup.Label>
            <div className="flex">
              {viewModes.map((mode, index) => (
                <RadioGroup.Option
                  key={mode.name}
                  value={mode.value}
                  className={({ checked }) =>
                    classNames(
                      checked
                        ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                        : 'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50',
                      index === 0 ? 'rounded-l-md' : '',
                      index === viewModes.length - 1 ? 'rounded-r-md' : '',
                      'px-3 py-2'
                    )
                  }
                >
                  <RadioGroup.Label as={mode.icon} className="h-6 w-6" aria-hidden="true" />
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Table */}
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    工作流
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    标签
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    更新时间
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">操作</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {workflows.map((workflow) => (
                  <tr key={workflow.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-800 sm:pl-0 w-1/4 lg:w-1/3 hover:cursor-pointer">
                      {workflow.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 w-1/5 lg:w-1/4">
                      {workflow.tags.join(', ')}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 w-1/5">
                      {workflow.updatedAt}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 w-1/5">
                      <a href={`/workspace/workflow/${workflow.id}`} className="text-indigo-600 hover:text-indigo-900 px-2">
                        编辑<span className="sr-only">, {workflow.name}</span>
                      </a>

                      <a href="#" className="text-indigo-600 hover:text-indigo-900 px-2 border-l border-gray-200">
                        克隆<span className="sr-only">, {workflow.name}</span>
                      </a>

                      <a href="#" className="text-indigo-600 hover:text-indigo-900 px-2 border-l border-gray-200">
                        分享<span className="sr-only">, {workflow.name}</span>
                      </a>

                      <a href="#" className="text-indigo-600 hover:text-indigo-900 px-2 border-l border-gray-200">
                        删除<span className="sr-only">, {workflow.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
