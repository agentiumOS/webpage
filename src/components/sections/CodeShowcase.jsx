import React, { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { motion } from 'framer-motion'

const snippets = [
  {
    id: 'agent',
    label: 'Simple Agent',
    description: 'Create an intelligent agent with tools, memory, and a specific persona in just a few lines of code.',
    code: `import { Agent, openai } from '@radaros/core';

const agent = new Agent({
  name: 'ResearchBot',
  model: openai('gpt-4o'),
  instructions: 'You are a helpful research assistant.',
  tools: [webSearch, fetchPage],
  memory: true,
});

const response = await agent.run('Find the latest news on AI.');
console.log(response.text);`
  },
  {
    id: 'team',
    label: 'Multi-Agent Team',
    description: 'Group agents into teams with coordination strategies like Route, Broadcast, or Collaborate.',
    code: `import { Team, Agent, openai } from '@radaros/core';

const researcher = new Agent({ name: 'Researcher', model: openai('gpt-4o') });
const writer = new Agent({ name: 'Writer', model: openai('gpt-4o') });

const contentTeam = new Team({
  name: 'ContentTeam',
  mode: 'coordinate', // Leader orchestrates the sub-agents
  leader: new Agent({ name: 'Leader', model: openai('gpt-4o') }),
  members: [researcher, writer],
});

await contentTeam.run('Write a detailed blog post about Q-learning.');`
  },
  {
    id: 'workflow',
    label: 'Stateful Workflow',
    description: 'Orchestrate deterministic, multi-step pipelines with typed state and retry policies.',
    code: `import { Workflow, AgentStep, FunctionStep } from '@radaros/core';

const extractData = new AgentStep({ agent: extractorAgent });
const validateData = new FunctionStep({ fn: validateSchema });

const pipeline = new Workflow({
  name: 'DataPipeline',
  initialState: { raw: '', parsed: null },
  steps: [extractData, validateData],
});

const result = await pipeline.run({ raw: '...' });`
  }
]

export default function CodeShowcase() {
  const [activeTab, setActiveTab] = useState(snippets[0])

  return (
    <section className="py-24 bg-surface/20 border-y border-border relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          <div className="flex-1 w-full max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Declarative API.<br/><span className="text-primary">No Graph Theory required.</span></h2>
            <p className="text-zinc-400 mb-8 text-lg">
              Unlike low-level frameworks, RadarOS doesn't force you to wire up nodes and edges. Define what you want, and the runtime handles the orchestration.
            </p>
            
            <div className="flex flex-col gap-3">
              {snippets.map(snippet => (
                <button
                  key={snippet.id}
                  onClick={() => setActiveTab(snippet)}
                  className={`text-left px-5 py-4 rounded-xl transition-all border ${
                    activeTab.id === snippet.id 
                      ? 'bg-primary/10 border-primary/30 shadow-[0_0_15px_-5px_rgba(34,211,238,0.2)]' 
                      : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                  }`}
                >
                  <h3 className={`font-semibold text-lg mb-1 ${activeTab.id === snippet.id ? 'text-primary' : 'text-zinc-200'}`}>
                    {snippet.label}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{snippet.description}</p>
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            className="flex-1 w-full max-w-2xl"
            key={activeTab.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d0d] shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/50 bg-[#161616]">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="ml-2 text-xs font-mono text-zinc-500">{activeTab.id}.ts</span>
              </div>
              <div className="p-6 overflow-x-auto text-sm">
                <Highlight theme={themes.vsDark} code={activeTab.code} language="typescript">
                  {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre className={className} style={{ ...style, backgroundColor: 'transparent' }}>
                      {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token })} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
