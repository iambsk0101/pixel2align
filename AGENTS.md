# Architecture rules

- Keep global pointer visuals in isolated React canvas components mounted by the portfolio shell, with each effect owning and cleaning up its listeners, observers, and animation loop; this keeps page sections independent and prevents leaked interactions.
- Keep the featured work accordion data-driven and preserve secondary projects as separate screenshot cards so the full portfolio remains accessible on every viewport.