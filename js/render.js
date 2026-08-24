/* RN Ready — question renderers for all NCLEX item formats.
   Each renderer: NC.renderItem(item, state, opts) → DOM node.
   state = { ans: <answer object>, set(ans) } · opts = { review:bool }       */
window.NC = window.NC || {};
(function(){
const L = "ABCDEFGH";
function el(tag, cls, html){ const e=document.createElement(tag); if(cls) e.className=cls; if(html!=null) e.innerHTML=html; return e; }
function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
NC.esc = esc;
NC.render = NC.render || {};

NC.renderStem = function(item, showMeta){
  const w = el("div");
  if (showMeta) w.appendChild(el("div","stem", `<span class="qtype-tag">${NC.TAX.qTypes[item.t]?.name || item.t}${item.cj? " · "+NC.TAX.cjNames[item.cj]:""}</span>${esc(item.stem)}`));
  else w.appendChild(el("div","stem", esc(item.stem)));
  return w;
};

NC.renderItem = function(item, state, opts){
  opts = opts||{};
  const box = el("div","qbox");
  const R = (q)=>opts.review ? reviewMarks(q) : null;
  switch(item.t){
    case "single": case "multi": box.appendChild(choiceList(item, state, opts)); break;
    case "emr": item.groups.forEach((g,gi)=>{
        box.appendChild(el("div","group-h", esc(g.h)));
        box.appendChild(choiceList({opts:g.opts, ans:g.ans, t:"multi", _gi:gi}, state, opts));
      }); break;
    case "drag": box.appendChild(dragAssign(item, state, opts)); break;
    case "cloze": box.appendChild(cloze(item, state, opts)); break;
    case "hotspot": box.appendChild(hotspot(item, state, opts)); break;
    case "matrix": box.appendChild(matrix(item, state, opts)); break;
  }
  return box;
};

/* single & multi (and emr groups) */
function choiceList(item, state, opts){
  const wrap = item._gi!=null ? el("fieldset","optgroup") : el("div");
  if (item._gi!=null) wrap.setAttribute("aria-label","Group: "+(item._gi+1));
  const multi = item.t==="multi" || item._gi!=null;
  item.opts.forEach((o,i)=>{
    const b = el("button","opt");
    b.type="button";
    let sel=false;
    if (multi){ const a = item._gi!=null ? (state.ans&&state.ans[item._gi]) : state.ans; sel = Array.isArray(a)&&a.includes(i); }
    else sel = state.ans===i;
    b.setAttribute("aria-pressed", sel?"true":"false");
    b.innerHTML = `<span class="key" aria-hidden="true">${L[i]}</span><span>${esc(o)}</span>`;
    if (opts.review){
      const should = item.ans!=null && (Array.isArray(item.ans)?item.ans.includes(i):item.ans===i);
      if (should) b.classList.add("correct");
      if (sel && !should) b.classList.add("wrong");
      b.disabled = true; b.style.opacity = sel||should?1:0.55;
    } else {
      b.onclick = ()=>{
        if (multi){
          const a = item._gi!=null ? ((state.ans&&{...state.ans})||{}) : ((state.ans||[]).slice());
          if (item._gi!=null){ const cur=a[item._gi]||[]; a[item._gi]= cur.includes(i)? cur.filter(x=>x!==i): [...cur,i]; }
          else { a.includes(i)? a.splice(a.indexOf(i),1) : a.push(i); }
          state.set(a);
        } else state.set(i);
        NC.render.refresh && NC.render.refresh();
      };
    }
    wrap.appendChild(b);
  });
  return wrap;
}

/* extended drag & drop: assign each option to a target (radio-seg per option — keyboard & touch friendly) */
function dragAssign(item, state, opts){
  const d = item.drag;
  const wrap = el("div");
  wrap.appendChild(el("div","dd-help","Assign each option to a position by tapping the numbered targets."));
  const ans = (state.ans && state.ans.length===d.opts.length) ? state.ans.slice() : d.opts.map(()=>-1);
  d.opts.forEach((o,i)=>{
    const row = el("div","dd-opt");
    row.appendChild(el("span","key",L[i]));
    row.appendChild(el("span","",esc(o)));
    if (opts.review){
      const ok = ans[i]===d.ans[i];
      row.appendChild(el("span","", `<b style="margin-left:auto;color:${ok?'var(--ok)':'var(--bad)'}">${ok?'✓':'✗'}</b><span style="color:var(--ink-3);font-size:12px">→ ${esc(d.targets[d.ans[i]])}</span>`));
    } else {
      const seg = el("div","mv");
      d.targets.forEach((t,ti)=>{
        const b = el("button","", ti.toString());
        b.type="button";
        b.setAttribute("aria-label", `Assign “${o}” to ${t}`);
        b.style.cssText = `min-width:34px;height:34px;border-radius:9px;font-weight:800;font-size:13px;border:1.5px solid ${ans[i]===ti?'var(--teal)':'var(--line)'};background:${ans[i]===ti?'var(--teal)':'var(--card)'};color:${ans[i]===ti?'#fff':'var(--ink-2)'}`;
        b.onclick = ()=>{ ans[i]=ti; state.set(ans.slice()); NC.render.refresh && NC.render.refresh(); };
        seg.appendChild(b);
      });
      row.appendChild(seg);
    }
    wrap.appendChild(row);
  });
  if (opts.review) wrap.appendChild(el("div","dd-help", `Correct order: ${d.opts.map((_,i)=>d.targets[d.ans[i]]+" = "+esc(d.opts[i])).join(" · ")}`));
  return wrap;
}

/* cloze */
function cloze(item, state, opts){
  const wrap = el("div");
  item.cloze.lines.forEach((line,li)=>{
    const row = el("div","cloze-line");
    row.appendChild(document.createTextNode(line.pre+" "));
    const cur = state.ans?.[li];
    if (opts.review){
      const ok = cur===line.ans;
      const b = el("span","blank "+(ok?"ok":"bad"), esc(cur!=null?line.opts[cur]:"—"));
      b.appendChild(el("span","", `<small style="display:block;font-size:11px;color:var(--ink-3)">correct: ${esc(line.opts[line.ans])}</small>`));
      row.appendChild(b);
    } else {
      const sel = el("select");
      sel.setAttribute("aria-label", line.pre.slice(0,40));
      sel.appendChild(el("option","",`— select —`)).value = "";
      line.opts.forEach((o,oi)=>{ const op=el("option","",esc(o)); op.value=oi; sel.appendChild(op); });
      if (cur!=null) sel.value = cur;
      sel.onchange = ()=>{ const a=(state.ans||[]).slice(); a[li]= parseInt(sel.value,10); state.set(a); };
      const b = el("span","blank"); b.appendChild(sel); row.appendChild(b);
    }
    row.appendChild(document.createTextNode(" "+line.post));
    wrap.appendChild(row);
  });
  return wrap;
}

/* enhanced hot spot (highlight rows or words) */
function hotspot(item, state, opts){
  const hs = item.hotspot;
  const wrap = el("div");
  wrap.appendChild(el("div","hs-note", hs.mode==="rows" ? "Tap a row to highlight it. Tap again to remove." : "Tap words to highlight them."));
  const sel = () => (state.ans||[]).slice();
  const rowsWrap = el("div","card");
  hs.rows.forEach((rtext,i)=>{
    const b = el("button","hs-row"); b.type="button";
    const on = sel().includes(i);
    b.setAttribute("aria-pressed", on?"true":"false");
    b.innerHTML = hs.mode==="rows" ? `<span>${esc(rtext)}</span><span class="hs-cell" aria-hidden="true">${on?"▣":"▢"}</span>` : `<span class="hs-unit">${esc(rtext)}</span>`;
    if (opts.review){
      const should = hs.ans.includes(i);
      if (should && on) b.classList.add("mark-ok");
      else if (on && !should) b.classList.add("mark-bad");
      b.disabled = true; b.style.opacity = 1;
      if (should && !on){ b.style.outline = "2px dashed var(--ok)"; b.style.outlineOffset="-2px"; }
    } else {
      b.onclick = ()=>{ const a=sel(); a.includes(i)? a.splice(a.indexOf(i),1): a.push(i); state.set(a); NC.render.refresh&&NC.render.refresh(); };
    }
    rowsWrap.appendChild(b);
  });
  wrap.appendChild(rowsWrap);
  return wrap;
}

/* matrix / grid */
function matrix(item, state, opts){
  const m = item.matrix;
  const wrap = el("div","mx-wrap");
  const tb = el("table","mx");
  tb.setAttribute("role","table");
  const thead = el("thead"); const hr = el("tr");
  hr.appendChild(el("th",""," "));
  m.cols.forEach(c=>hr.appendChild(el("th","",esc(c))));
  thead.appendChild(hr); tb.appendChild(thead);
  const tbody = el("tbody");
  m.rows.forEach((rowText,r)=>{
    const tr = el("tr");
    tr.appendChild(el("td","",esc(rowText)));
    m.cols.forEach((_,c)=>{
      const td = el("td");
      const inp = document.createElement("input");
      inp.type = m.mode==="check" ? "checkbox" : "radio";
      inp.name = "mx-"+(item.id||"x")+"-r"+r;
      inp.setAttribute("aria-label", `${rowText}: ${m.cols[c]}`);
      const isOn = m.mode==="check" ? ((state.ans?.[r])||[]).includes(c) : state.ans?.[r]===c;
      inp.checked = !!isOn;
      if (opts.review){
        const should = m.mode==="check" ? (m.ans[r]||[]).includes(c) : m.ans[r]===c;
        td.classList.add(should?"mark-ok": (isOn?"mark-bad":""));
        inp.disabled = true;
      } else {
        inp.onchange = ()=>{
          if (m.mode==="check"){ const a=(state.ans||[]).map(x=>Array.isArray(x)?x.slice():[]); a[r]=a[r]||[]; inp.checked? a[r].push(c): a[r]=a[r].filter(x=>x!==c); state.set(a); }
          else { const a=(state.ans||[]).slice(); a[r]=c; state.set(a); }
        };
      }
      td.appendChild(inp); tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  tb.appendChild(tbody); wrap.appendChild(tb);
  return wrap;
}

/* exhibits (case studies) */
NC.renderExhibit = function(exh){
  const w = el("div");
  if (exh.type==="kv"){
    exh.rows.forEach(([k,v])=> w.appendChild(el("div","kv",`<span>${esc(k)}</span><b>${esc(v)}</b>`)));
  } else {
    w.appendChild(el("p","",esc(exh.body)));
  }
  return w;
};
})();
