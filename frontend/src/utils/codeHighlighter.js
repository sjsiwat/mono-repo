import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-http';

export function detectLanguage(file = '', code = '') {
  const f = file.toLowerCase();
  if (f.endsWith('.json') || f.includes('package.json')) return 'json';
  if (f.endsWith('.sh') || f.endsWith('.bash') || f.includes('terminal')) return 'bash';
  if (f.endsWith('.rest') || f.endsWith('.http')) return 'http';
  
  const trimmed = code.trim();
  if (trimmed.startsWith('npm ') || trimmed.startsWith('npx ') || trimmed.startsWith('node ') || trimmed.startsWith('curl ')) {
    return 'bash';
  }
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    return 'json';
  }
  return 'javascript';
}

export function tokenizeCodeToLines(codeText, lang = 'javascript') {
  if (!codeText) return [];
  const grammar = Prism.languages[lang] || Prism.languages.javascript;
  const rawTokens = Prism.tokenize(codeText, grammar);
  const lines = [[]];

  function processToken(token, parentType = null) {
    if (typeof token === 'string') {
      const parts = token.split('\n');
      for (let i = 0; i < parts.length; i++) {
        if (i > 0) lines.push([]);
        if (parts[i]) {
          lines[lines.length - 1].push({
            type: parentType || 'plain',
            content: parts[i]
          });
        }
      }
    } else if (Array.isArray(token.content)) {
      for (const child of token.content) {
        processToken(child, token.type || parentType);
      }
    } else if (typeof token.content === 'string') {
      const parts = token.content.split('\n');
      for (let i = 0; i < parts.length; i++) {
        if (i > 0) lines.push([]);
        if (parts[i]) {
          lines[lines.length - 1].push({
            type: token.type,
            content: parts[i]
          });
        }
      }
    }
  }

  for (const token of rawTokens) {
    processToken(token);
  }

  return lines;
}

export function getTokenColorClass(type) {
  switch (type) {
    case 'comment':
    case 'prolog':
    case 'doctype':
    case 'cdata':
      return 'text-[#E5B567] italic font-medium opacity-90'; // Amber/Gold warm comment
    
    case 'keyword':
    case 'rule':
      return 'text-[#C678DD] font-semibold'; // Vibrant Purple (const, import, return, await, async, if)
    
    case 'string':
    case 'attr-value':
    case 'template-string':
      return 'text-[#7EE787]'; // Neon Terminal Fresh Green
    
    case 'number':
      return 'text-[#FF9E64] font-medium'; // Soft Coral Orange (200, 404, 12, 666)
    
    case 'boolean':
    case 'constant':
      return 'text-[#FF7B72] font-semibold'; // Coral Red (true, false, null, undefined)
    
    case 'function':
      return 'text-[#61AFEF] font-medium'; // Sky Blue / Cobalt (find, compare, json, status)
    
    case 'class-name':
      return 'text-[#E5C07B] font-semibold'; // Golden Yellow (User, Router, Error)
    
    case 'parameter':
      return 'text-[#FFA657] italic'; // Warm Apricot (req, res, next)
    
    case 'property':
    case 'literal-property':
    case 'attr-name':
      return 'text-[#79C0FF]'; // Property Blue / Soft Cyan (username, email, role)
    
    case 'operator':
    case 'arrow':
      return 'text-[#56B6C2] font-medium'; // Electric Cyan (=, =>, +, :, ===)
    
    case 'punctuation':
      return 'text-[#8B949E]'; // Muted Slate Grey ({, }, (, ), ;, ,)
    
    case 'regex':
      return 'text-[#F69D50] font-mono'; // Vivid Amber
    
    case 'variable':
      return 'text-[#E6EDF3]'; // Clean White
    
    default:
      return 'text-[#D1D7E0]'; // Default Code Text
  }
}
