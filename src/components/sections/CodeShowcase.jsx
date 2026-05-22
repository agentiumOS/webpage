import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Highlight, themes } from 'prism-react-renderer'
import SectionHeader from '../ui/SectionHeader'

const codeAgentium = `import { Agent, openai } from '@agentium/core';

const research = new Agent({
  name: 'ResearchBot',
  model: openai('gpt-4o'),
  instructions: 'Verify sources before answering.',
  tools: [webSearch, fetchPage],
  memory: { profile: true, learnings: true },
});

const response = await research.run({
  input: 'Find the latest AI runtime patterns',
  trace: true,
});

console.log(response.text);`

const codeLangChain = `import { StateGraph, MessagesAnnotation } from '@langchain/langgraph';
import { ChatOpenAI } from '@langchain/openai';
import { ToolNode } from '@langchain/langgraph/prebuilt';

const tools = [webSearch, fetchPage];
const model = new ChatOpenAI({ model: 'gpt-4o' }).bindTools(tools);

function callModel(state: typeof MessagesAnnotation.State) {
  return { messages: [model.invoke(state.messages)] };
}

function shouldContinue(state: typeof MessagesAnnotation.State) {
  const last = state.messages[state.messages.length - 1];
  return last.tool_calls?.length ? 'tools' : '__end__';
}

const graph = new StateGraph(MessagesAnnotation)
  .addNode('agent', callModel)
  .addNode('tools', new ToolNode(tools))
  .addEdge('__start__', 'agent')
  .addConditionalEdges('agent', shouldContinue)
  .addEdge('tools', 'agent');`

const codeAgno = `from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.duckduckgo import DuckDuckGoTools

# Agno is expressive, but it is Python-first.
# Agentium brings this DX to TypeScript apps.
agent = Agent(
    model=OpenAIChat(id='gpt-4o'),
    description='Verify sources before answering.',
    tools=[DuckDuckGoTools()],
    add_history_to_messages=True
)

agent.print_response('Find the latest AI runtime patterns')`

function CodeBlock({ code, language, title }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-slate-950 font-mono text-sm">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-white/25" />
          <div className="h-3 w-3 rounded-full bg-white/15" />
          <div className="h-3 w-3 rounded-full bg-[#b7a7ff]/35" />
        </div>
        <span className="text-xs font-bold text-slate-400">{title}</span>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <Highlight theme={themes.vsDark} code={code} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={{ ...style, backgroundColor: 'transparent', margin: 0 }}>
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
  )
}

export default function CodeShowcase() {
  const [comparison, setComparison] = useState('langchain')
  const [position, setPosition] = useState(54)
  const containerRef = useRef(null)

  const handleMouseMove = (event) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width))
    setPosition((x / rect.width) * 100)
  }

  const currentRightCode = comparison === 'langchain' ? codeLangChain : codeAgno
  const currentRightLang = comparison === 'langchain' ? 'typescript' : 'python'
  const currentRightTitle = comparison === 'langchain' ? 'langgraph.ts' : 'agno_agent.py'

  return (
    <section className="section-shell border-b border-white/10 bg-[#080B1D]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_20%,rgba(109,95,147,0.08),transparent_32rem)]" />
      <div className="container relative z-10 mx-auto px-6">
        <SectionHeader eyebrow="Developer proof" title="Less graph wiring, more product logic.">
          Keep orchestration close to your TypeScript application. The comparison lab shows how much framework ceremony disappears when agents, tools, memory, and traces share one runtime.
        </SectionHeader>

        <div className="mt-10 flex justify-center gap-3">
          {[
            ['langchain', 'vs LangGraph'],
            ['agno', 'vs Agno'],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setComparison(id)}
              className={`rounded-full border px-5 py-2 text-sm font-bold transition ${comparison === id ? 'border-white/20 bg-white/[0.08] text-white' : 'border-white/10 bg-white/[0.04] text-slate-400 hover:text-white'}`}
            >
              {label}
            </button>
          ))}
        </div>

        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setPosition(54)}
          className="relative mx-auto mt-8 h-[560px] max-w-6xl cursor-crosshair overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-[0_0_70px_rgba(0,0,0,0.24)]"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        >
          <div className="absolute inset-0 w-full h-full">
            <CodeBlock code={codeAgentium} language="typescript" title="agentium-agent.ts" />
            <div className="absolute bottom-6 left-6 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white backdrop-blur">
              Agentium
            </div>
          </div>

          <div className="absolute bottom-0 right-0 top-0 overflow-hidden border-l border-white" style={{ width: `${100 - position}%` }}>
            <div className="absolute bottom-0 right-0 top-0 h-full" style={{ width: `${containerRef.current?.offsetWidth || 1000}px` }}>
              <CodeBlock code={currentRightCode} language={currentRightLang} title={currentRightTitle} />
            </div>
            <div className="absolute bottom-6 right-6 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-slate-300 backdrop-blur">
              {comparison === 'langchain' ? 'LangGraph' : 'Agno'}
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-0 top-0 z-20 w-px bg-white/70" style={{ left: `${position}%` }}>
            <div className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-slate-950 text-white shadow-[0_0_28px_rgba(255,255,255,0.12)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
              </svg>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.03] to-transparent" />
        </motion.div>

        <p className="mt-7 text-center font-mono text-sm font-bold text-slate-400">Move across the lab to compare orchestration surface area.</p>
      </div>
    </section>
  )
}
