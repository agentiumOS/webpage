import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Highlight, themes } from 'prism-react-renderer'

const codeRadarOS = `import { Agent, openai } from '@radaros/core';

const agent = new Agent({
  name: 'ResearchBot',
  model: openai('gpt-4o'),
  instructions: 'You are a helpful research assistant.',
  tools: [webSearch, fetchPage],
  memory: true,
});

const response = await agent.run('Find the latest news on AI.');
console.log(response.text);`

const codeLangChain = `import { StateGraph, MessagesAnnotation } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import { ToolNode } from "@langchain/langgraph/prebuilt";

const tools = [webSearch, fetchPage];
const model = new ChatOpenAI({ model: "gpt-4o" }).bindTools(tools);

function callModel(state: typeof MessagesAnnotation.State) {
  return { messages: [model.invoke(state.messages)] };
}

function shouldContinue(state: typeof MessagesAnnotation.State) {
  const lastMessage = state.messages[state.messages.length - 1];
  return lastMessage.tool_calls?.length ? "tools" : "__end__";
}

const graph = new StateGraph(MessagesAnnotation)
  .addNode("agent", callModel)
  .addNode("tools", new ToolNode(tools))
  .addEdge("__start__", "agent")
  .addConditionalEdges("agent", shouldContinue)
  .addEdge("tools", "agent");

const app = graph.compile();
await app.invoke({ messages: [["user", "Find latest AI news"]] });`

const codeAgno = `from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.duckduckgo import DuckDuckGoTools

# Agno is great, but it's Python-only. 
# RadarOS brings this declarative DX natively to TypeScript.
agent = Agent(
    model=OpenAIChat(id="gpt-4o"),
    description="You are a helpful research assistant.",
    tools=[DuckDuckGoTools()],
    add_history_to_messages=True
)

agent.print_response("Find the latest news on AI.")`

function CodeBlock({ code, language, title }) {
  return (
    <div className="w-full h-full bg-slate-900 flex flex-col font-mono text-sm border-2 border-emerald-500">
      <div className="flex items-center justify-between px-4 py-3 border-b-2 border-emerald-900/50 bg-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-400"></div>
          <div className="w-3 h-3 bg-yellow-400"></div>
          <div className="w-3 h-3 bg-emerald-400"></div>
        </div>
        <span className="text-emerald-400 text-xs font-mono font-bold">{title}</span>
      </div>
      <div className="p-6 overflow-auto flex-1">
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
  const [comparison, setComparison] = useState('langchain') // 'langchain' or 'agno'
  const [position, setPosition] = useState(50)
  const containerRef = useRef(null)
  
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const percentage = (x / rect.width) * 100
    setPosition(percentage)
  }

  const currentRightCode = comparison === 'langchain' ? codeLangChain : codeAgno
  const currentRightLang = comparison === 'langchain' ? 'typescript' : 'python'
  const currentRightTitle = comparison === 'langchain' ? 'langgraph.ts' : 'agno_agent.py'

  return (
    <section className="py-24 bg-slate-50 border-y border-emerald-200 relative z-10">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 tracking-tight">
            The power of <span className="text-emerald-600">Declarative</span> Orchestration.
          </h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
            Stop wiring up edges and managing state channels manually. Build agents that feel like native code.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button 
            onClick={() => setComparison('langchain')}
            className={`px-6 py-2 border-2 text-sm font-bold transition-all shadow-[4px_4px_0px_#d1fae5] hover:-translate-y-[2px] ${comparison === 'langchain' ? 'bg-emerald-600 text-white border-emerald-700 shadow-[4px_4px_0px_#065f46]' : 'bg-white text-slate-700 border-emerald-300 hover:border-emerald-400'}`}
          >
            vs LangGraph
          </button>
          <button 
            onClick={() => setComparison('agno')}
            className={`px-6 py-2 border-2 text-sm font-bold transition-all shadow-[4px_4px_0px_#d1fae5] hover:-translate-y-[2px] ${comparison === 'agno' ? 'bg-emerald-600 text-white border-emerald-700 shadow-[4px_4px_0px_#065f46]' : 'bg-white text-slate-700 border-emerald-300 hover:border-emerald-400'}`}
          >
            vs Agno
          </button>
        </div>

        <motion.div 
          className="relative w-full h-[500px] md:h-[600px] bg-slate-900 border-2 border-emerald-400 shadow-[8px_8px_0px_#d1fae5] overflow-hidden select-none cursor-crosshair"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setPosition(50)}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          {/* Left Side - RadarOS */}
          <div className="absolute inset-0 w-full h-full">
            <CodeBlock code={codeRadarOS} language="typescript" title="radar-agent.ts" />
            
            {/* Label Overlay */}
            <div className="absolute bottom-6 left-6 bg-emerald-500 text-white px-4 py-2 text-xs font-bold tracking-wider uppercase border-2 border-emerald-700 shadow-[4px_4px_0px_#065f46] z-10">
              RadarOS
            </div>
          </div>

          {/* Right Side - Comparison */}
          <div 
            className="absolute top-0 right-0 bottom-0 overflow-hidden border-l-4 border-white"
            style={{ width: `${100 - position}%` }}
          >
            <div 
              className="absolute top-0 bottom-0 right-0 h-full"
              style={{ width: `${containerRef.current?.offsetWidth || 1000}px` }}
            >
              <CodeBlock code={currentRightCode} language={currentRightLang} title={currentRightTitle} />
            </div>
            
            {/* Label Overlay */}
            <div className="absolute bottom-6 right-6 bg-slate-800 text-emerald-400 px-4 py-2 text-xs font-bold tracking-wider uppercase border-2 border-emerald-500 shadow-[4px_4px_0px_#059669] z-10">
              {comparison === 'langchain' ? 'LangGraph' : 'Agno'}
            </div>
          </div>

          {/* Slider Handle (Visual only now) */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white z-20 flex flex-col items-center justify-center pointer-events-none"
            style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-10 h-10 bg-white border-2 border-emerald-500 flex items-center justify-center text-emerald-600 absolute shadow-[4px_4px_0px_#059669]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 17l5-5-5-5M6 17l5-5-5-5"/>
              </svg>
            </div>
          </div>

        </motion.div>

        <div className="mt-8 text-center text-sm font-bold font-mono text-emerald-600 flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
          Hover over the code to compare syntax
        </div>

      </div>
    </section>
  )
}
