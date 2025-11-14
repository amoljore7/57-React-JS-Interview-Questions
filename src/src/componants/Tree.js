import React from 'react'

function buildTree(paths) {
  const root = [];

  for (const path of paths) { // Iterate through each path in the input array 
    const parts = path.split('/'); //

    let currentLevel = root;
    let currentPath = "";

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]; // Get the current part of the path
      currentPath = currentPath ? `${currentPath}/${part}` : part;

      let existing = currentLevel.find(item => item.label === part); // Check if the part already exists at the current level

      if (!existing) { //if existing variable is undefined means not found then this block will execute
        existing = {
          label: part,
          path: currentPath,
          type: i === parts.length - 1 ? "file" : "folder", // Determine if it's a file or folder 
          ...(i === parts.length - 1 ? {} : { children: [] }) // Only add children array for folders
        };
        currentLevel.push(existing); // Add new part to the current level
      }

      if (existing.children) { // Move to the next level if children exist 
        currentLevel = existing.children;
      }
    }
  }

  return root;
}

const files = [
  "src/components/Button.js",
  "src/components/Input.js",
  "src/utils/helpers.js",
  "src/index.js",
  "package.json"
];

// const tree = buildTree(files);
// console.log(JSON.stringify(tree, null, 2));

// Example (quick trace)

// Input: ["src/components/Button.js"]
// 	•	root = []
// 	•	parts = ["src","components","Button.js"]
// 	•	i=0: “src” — not found → create {label:"src", type:"folder", path:"src", children:[]} → push → descend into children
// 	•	i=1: “components” — not found in src.children → create {label:"components", type:"folder", path:"src/components", children:[]} → push → descend
// 	•	i=2: “Button.js” — not found in components.children → create {label:"Button.js", type:"file", path:"src/components/Button.js"} → push → file has no children, so done.
// 	•	Return tree with src -> components -> Button.js.

export const treeData_1 = buildTree(files);
export const treeData = [
  {
    id: 1,
    label: 'Engineering Vault',
    path: '/',
    type: 'node',
    children: [
      {
        id: 2,
        label: 'Backend Services',
        type: 'node',
        children: [
          {
            id: 3,
            type: 'leaf',
            label: 'Database Credentials'
          },
          {
            id: 4,
            label: 'API Keys',
            type: 'node',
            children: [
              {
                id: 5,
                type: 'leaf',
                label: 'Payment Gateway Key'
              },
              {
                id: 6,
                type: 'leaf',
                label: 'Auth Service Key'
              }
            ]
          }
        ]
      },
      {
        id: 7,
        type: 'leaf',
        label: 'Global Config'
      }
    ]
  },
  {
    id: 8,
    label: 'DevOps Vault',
    type: 'node',
    children: [
      {
        id: 9,
        label: 'Kubernetes',
        type: 'node',
        children: [
          {
            id: 10,
            type: 'leaf',
            label: 'Cluster Secrets'
          },
          {
            id: 11,
            type: 'leaf',
            label: 'Docker Credentials'
          }
        ]
      },
      {
        id: 12,
        type: 'leaf',
        label: 'CI/CD Tokens'
      }
    ]
  },
  {
    id: 13,
    type: 'leaf',
    label: 'Shared Vault Policy'
  },
  {
    id: 14,
    label: 'Security Vault',
    type: 'node',
    children: [
      {
        id: 15,
        type: 'leaf',
        label: 'Encryption Keys'
      },
      {
        id: 16,
        type: 'leaf',
        label: 'Audit Logs'
      }
    ]
  }
];

const Tree = () => {
  return (
    <div>
      <h2>Tree Structure</h2>
      {treeData_1?.map((node, index) => (
        <TreeNode
          key={index}
          node={node}
        />
      ))}
    </div>
  )
}

export default Tree


const TreeNode = ({ node }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <div style={{ display: 'flex', gap: '5px' }}>
        {node?.children && (
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '▼' : '▶'}
          </span>
        )}
        {node.label}
      </div>

      {isOpen && node?.children && (
        <div>
          {node?.children.map((child, index) => (
            <div style={{ paddingLeft: '10px' }}>
              <TreeNode
                key={index}
                node={child}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
