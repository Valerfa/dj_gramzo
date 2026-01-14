WORKFLOW FOR UI CHANGES:

1. User describes the desired UI or behavior in natural language
2. Assistant:
   - updates React/Next components if needed
   - updates app/globals.css according to project rules
3. Assistant never asks the user to manually edit CSS
4. Assistant always explains WHAT was changed, not HOW to type it
5. All changes must respect existing layout and spacing rules