import { Question, JobRole, ExperienceLevel, InterviewType } from '../types';

export const QUESTION_BANK: Question[] = [
  // ==================== PYTHON DEVELOPER ====================
  // Beginner
  {
    id: 'py-beg-1',
    role: 'Python Developer',
    level: 'Beginner',
    type: 'Technical',
    category: 'Core Data Structures',
    difficulty: 'Easy',
    question: 'What is the key difference between a list and a tuple in Python?',
    expectedConcepts: [
      'Lists are mutable while tuples are immutable',
      'Lists use square brackets and tuples use parentheses',
      'Tuples are faster and consume less memory than lists',
      'Tuples can be used as dictionary keys if all elements are immutable'
    ],
    expectedKeywords: ['list', 'tuple', 'mutable', 'immutable', 'parentheses', 'brackets', 'memory', 'performance', 'dictionary keys'],
    benchmarkAnswer: 'In Python, the primary difference is mutability. Lists are mutable, meaning elements can be added, removed, or modified in place, and they use square brackets []. Tuples are immutable, meaning their elements cannot be changed after creation, and they use parentheses (). Because of immutability, tuples are generally faster, require less memory overhead, and can serve as dictionary keys when hashable.'
  },
  {
    id: 'py-beg-2',
    role: 'Python Developer',
    level: 'Beginner',
    type: 'Technical',
    category: 'Data Structures',
    difficulty: 'Easy',
    question: 'What is a dictionary in Python and how do lookups work internally?',
    expectedConcepts: [
      'A dictionary is a key-value pair mapping data structure',
      'Implemented using a hash table under the hood',
      'Average time complexity for lookup, insertion, and deletion is O(1)',
      'Keys must be hashable and immutable'
    ],
    expectedKeywords: ['dictionary', 'key-value', 'hash table', 'hash function', 'o(1)', 'constant time', 'immutable keys', 'lookup'],
    benchmarkAnswer: 'A dictionary in Python is an unordered (ordered by insertion since 3.7) collection of key-value pairs. Under the hood, dictionaries are implemented using hash tables. When you store or query a key, Python computes its hash using the hash() function, determining its index in memory. This enables average O(1) constant time complexity for insertions, updates, and lookups.'
  },
  {
    id: 'py-beg-3',
    role: 'Python Developer',
    level: 'Beginner',
    type: 'Technical',
    category: 'Language Fundamentals',
    difficulty: 'Easy',
    question: 'How does exception handling work in Python using try, except, else, and finally blocks?',
    expectedConcepts: [
      'try block encloses code that may raise an error',
      'except block handles specific raised exceptions',
      'else executes only when no exception occurs in try',
      'finally always executes regardless of whether an exception occurred'
    ],
    expectedKeywords: ['try', 'except', 'else', 'finally', 'exception', 'raise', 'cleanup', 'error handling', 'traceback'],
    benchmarkAnswer: 'Exception handling in Python isolates potential runtime errors. Code that might fail is placed in the try block. The except block intercepts and handles specific exception classes. The optional else block runs exclusively if no exceptions were raised. The finally block always runs whether an exception occurred or not, making it ideal for cleanup tasks such as closing file streams or network sockets.'
  },
  {
    id: 'py-beg-4',
    role: 'Python Developer',
    level: 'Beginner',
    type: 'Technical',
    category: 'Functions & Scope',
    difficulty: 'Easy',
    question: 'What are *args and **kwargs in Python function definitions?',
    expectedConcepts: [
      '*args allows passing a variable number of positional arguments as a tuple',
      '**kwargs allows passing a variable number of keyword arguments as a dictionary',
      'Provides flexibility when writing functions or wrappers'
    ],
    expectedKeywords: ['args', 'kwargs', 'positional arguments', 'keyword arguments', 'tuple', 'dictionary', 'unpacking', 'variable arguments'],
    benchmarkAnswer: '*args and **kwargs permit passing arbitrary numbers of arguments to a function. The *args syntax captures extra positional arguments as a tuple, whereas **kwargs captures extra keyword arguments as a dictionary. They are frequently utilized in decorator functions, class inheritance wrappers, and generic helper utilities.'
  },
  {
    id: 'py-beg-5',
    role: 'Python Developer',
    level: 'Beginner',
    type: 'Technical',
    category: 'Language Basics',
    difficulty: 'Easy',
    question: 'What is Python and why is it described as an interpreted, dynamically-typed language?',
    expectedConcepts: [
      'Python executes code through an interpreter line-by-line rather than pre-compiling to machine code',
      'Dynamic typing means variable types are checked at runtime rather than compile time',
      'Variables do not require explicit type declarations'
    ],
    expectedKeywords: ['interpreted', 'dynamically typed', 'runtime', 'compiler', 'bytecode', 'pvm', 'type declaration', 'readable'],
    benchmarkAnswer: 'Python is a high-level interpreted programming language. It is interpreted because source code is converted to bytecode and executed by the Python Virtual Machine (PVM) line by line rather than compiled directly into native machine instructions beforehand. It is dynamically typed because variable types are evaluated and bound during execution at runtime, eliminating the requirement to declare variable types explicitly.'
  },

  // Intermediate
  {
    id: 'py-int-1',
    role: 'Python Developer',
    level: 'Intermediate',
    type: 'Technical',
    category: 'Advanced Functions',
    difficulty: 'Medium',
    question: 'Explain what decorators are in Python and provide a realistic use case.',
    expectedConcepts: [
      'A decorator is a callable that takes a function as input and returns a modified function without altering source code',
      'Syntactic sugar represented by @decorator_name',
      'Relies on first-class functions and closures',
      'Common use cases include logging, authentication, timing/benchmarking, and caching'
    ],
    expectedKeywords: ['decorator', 'wrapper', 'closure', 'first-class functions', 'higher-order function', 'syntactic sugar', 'logging', 'timing', 'authentication'],
    benchmarkAnswer: 'A decorator in Python is a higher-order function that takes another function as an argument, extends or alters its behavior without modifying its source code, and returns a callable wrapper. Syntactically invoked with the @ symbol, decorators rely on Python first-class functions and closures. Standard real-world use cases include authentication guards in web frameworks like Flask/Django, execution timing profilers, rate limiting, and caching with functools.lru_cache.'
  },
  {
    id: 'py-int-2',
    role: 'Python Developer',
    level: 'Intermediate',
    type: 'Technical',
    category: 'Iteration & Memory',
    difficulty: 'Medium',
    question: 'Explain how generators work in Python and why the yield keyword is beneficial for memory efficiency.',
    expectedConcepts: [
      'Generators produce iterators lazily on-the-fly rather than computing entire datasets in memory',
      'The yield keyword pauses function execution and saves its state until next() is called',
      'Drastically reduces memory consumption when handling large files or infinite streams'
    ],
    expectedKeywords: ['generator', 'yield', 'lazy evaluation', 'iterator', 'next', 'memory efficiency', 'streaming', 'state preservation'],
    benchmarkAnswer: 'Generators are specialized iterator functions that generate values on-demand using lazy evaluation. Unlike normal functions that return a value and terminate, a generator uses the yield keyword to produce a value, pausing function state, local variables, and execution context. When next() is invoked, execution resumes immediately after the yield. This prevents loading entire datasets into RAM, making generators crucial for streaming multi-gigabyte log files, database cursors, and large data pipelines.'
  },
  {
    id: 'py-int-3',
    role: 'Python Developer',
    level: 'Intermediate',
    type: 'Technical',
    category: 'Object References',
    difficulty: 'Medium',
    question: 'What is the difference between a shallow copy and a deep copy in Python?',
    expectedConcepts: [
      'Shallow copy creates a new compound object but inserts references to the original nested objects',
      'Deep copy recursively duplicates both the outer object and all child objects contained within it',
      'Available via the copy module (copy.copy vs copy.deepcopy)'
    ],
    expectedKeywords: ['shallow copy', 'deep copy', 'copy module', 'references', 'nested objects', 'recursive', 'mutation', 'pointers'],
    benchmarkAnswer: 'A shallow copy (via copy.copy() or slicing) constructs a new container object, but populates it with references to the child objects found in the original. As a result, modifying nested mutable elements inside the copied object will inadvertently mutate the original. In contrast, a deep copy (via copy.deepcopy()) recursively copies the container as well as all nested objects, creating completely independent clones with zero shared memory references.'
  },
  {
    id: 'py-int-4',
    role: 'Python Developer',
    level: 'Intermediate',
    type: 'Technical',
    category: 'OOP Concepts',
    difficulty: 'Medium',
    question: 'Explain the core OOP concepts in Python: Encapsulation, Abstraction, Inheritance, and Polymorphism.',
    expectedConcepts: [
      'Encapsulation: Bundling data and methods; access control via private/protected naming conventions',
      'Abstraction: Hiding complex implementation details using abstract base classes (abc module)',
      'Inheritance: Subclasses inheriting attributes and behaviors from superclasses',
      'Polymorphism: Different classes implementing methods with the same interface/signature'
    ],
    expectedKeywords: ['encapsulation', 'abstraction', 'inheritance', 'polymorphism', 'classes', 'objects', 'dunder methods', 'abstract base classes', 'override'],
    benchmarkAnswer: 'Python supports all four fundamental OOP paradigms. Encapsulation bundles data attributes and behavior within a class, employing leading underscores (_protected or __private) for access privacy. Abstraction hides intricate internal mechanics, exposing only essential interfaces through the abc (Abstract Base Classes) module. Inheritance allows child classes to derive fields and methods from parent classes using super(), facilitating code reuse. Polymorphism permits distinct objects to respond to the identical method call in class-specific manners, aided by Python duck-typing.'
  },
  {
    id: 'py-int-5',
    role: 'Python Developer',
    level: 'Intermediate',
    type: 'Technical',
    category: 'Memory Management',
    difficulty: 'Medium',
    question: 'How does Python manage memory, and how does the Garbage Collector handle cyclic references?',
    expectedConcepts: [
      'Memory is allocated in a private heap managed by the Python memory manager',
      'Reference counting is the primary memory reclamation mechanism',
      'Cyclic garbage collector (gc module) detects circular object references',
      'Generational collection divides objects into three generations (Gen 0, 1, 2)'
    ],
    expectedKeywords: ['reference counting', 'garbage collection', 'cyclic references', 'private heap', 'generational', 'gc module', 'deallocation', 'memory leak'],
    benchmarkAnswer: 'Python manages memory inside an internal private heap using the PyMalloc allocator. Its primary memory management strategy is reference counting: each object tracks how many references point to it, and when the count drops to zero, its memory is deallocated instantly. To resolve cyclic references where objects reference each other and prevent zero-count deallocation, Python has a generational cyclic garbage collector (gc module) that divides objects into three generations (0, 1, and 2) and runs periodic graph-cycle detection to identify and reclaim unreachable reference cycles.'
  },

  // Advanced
  {
    id: 'py-adv-1',
    role: 'Python Developer',
    level: 'Advanced',
    type: 'Technical',
    category: 'Concurrency & Internals',
    difficulty: 'Hard',
    question: 'What is the Global Interpreter Lock (GIL) in CPython, why does it exist, and how do you bypass its limitations for CPU-bound tasks?',
    expectedConcepts: [
      'GIL is a mutex that prevents multiple native threads from executing Python bytecode simultaneously',
      'Exists primarily to ensure thread safety of CPython memory management and reference counting',
      'Limits multithreading to I/O-bound concurrency rather than true CPU parallelism',
      'Bypassed using multiprocessing, C-extensions, Cython, PyPy (STM), or nogil Python 3.13+'
    ],
    expectedKeywords: ['gil', 'global interpreter lock', 'cpython', 'mutex', 'cpu-bound', 'multiprocessing', 'threads', 'parallelism', 'race conditions'],
    benchmarkAnswer: 'The Global Interpreter Lock (GIL) is a mutual exclusion lock implemented in CPython that allows only one thread to hold control of the Python interpreter and execute bytecode at any single moment. It was designed to protect CPython internal memory structures and reference counting from concurrency race conditions without complex fine-grained locking overhead. While multithreading provides concurrency for I/O-bound operations (e.g. network requests), CPU-bound multithreading does not achieve true parallelism. Developers bypass the GIL by utilizing the multiprocessing module (which spawns independent process heaps), offloading compute to compiled C/C++ extensions or NumPy, using alternative runtimes, or leveraging the experimental free-threaded (PEP 703) mode in Python 3.13+.'
  },
  {
    id: 'py-adv-2',
    role: 'Python Developer',
    level: 'Advanced',
    type: 'Technical',
    category: 'Asynchronous Programming',
    difficulty: 'Hard',
    question: 'How does asyncio work under the hood with event loops, coroutines, tasks, and cooperative multitasking?',
    expectedConcepts: [
      'Event loop monitors I/O sockets and dispatches ready callbacks',
      'Coroutines defined with async def yield execution to the loop via await',
      'Cooperative multitasking requires coroutines not to block the thread with synchronous CPU operations',
      'Tasks wrap coroutines to schedule them concurrently on the event loop'
    ],
    expectedKeywords: ['asyncio', 'event loop', 'coroutine', 'await', 'task', 'cooperative multitasking', 'non-blocking', 'future'],
    benchmarkAnswer: 'Python asyncio implements single-threaded cooperative multitasking centered on an event loop. Coroutines declared with async def create generator-like objects that pause when executing an await expression, handing control back to the event loop. The loop uses OS-level I/O multiplexing primitives (such as epoll on Linux, kqueue on macOS, or IOCP on Windows) to monitor open sockets or file descriptors. When an I/O event resolves, the event loop resumes the waiting coroutine task. Because multitasking is cooperative, any synchronous or long-running CPU-bound operation blocks the entire event loop thread, requiring offloading to loop.run_in_executor.'
  },
  {
    id: 'py-adv-3',
    role: 'Python Developer',
    level: 'Advanced',
    type: 'Technical',
    category: 'Metaprogramming',
    difficulty: 'Hard',
    question: 'What are metaclasses in Python and how do __new__ and __init__ differ during class creation?',
    expectedConcepts: [
      'A metaclass is the class of a class, defining how classes themselves are constructed',
      'type is the default metaclass in Python',
      '__new__ is a static constructor that instantiates and returns the class object',
      '__init__ initializes the newly created class object after creation'
    ],
    expectedKeywords: ['metaclass', 'type', '__new__', '__init__', 'class creation', 'metaprogramming', 'instantiation', 'attributes'],
    benchmarkAnswer: 'In Python, everything is an object, including classes; metaclasses are the blueprints that construct classes. type is Python built-in metaclass. When defining a class with metaclass=Meta, Python invokes the metaclass __new__ method to allocate and return the class object in memory, passing the class name, bases, and attribute dictionary. Afterwards, __init__ is called on that class object to initialize its attributes. Metaclasses are heavily used by ORMs (like Django Models and Pydantic) to validate schemas, register plugins, and enforce design rules at declaration time.'
  },

  // ==================== JAVA DEVELOPER ====================
  // Beginner
  {
    id: 'java-beg-1',
    role: 'Java Developer',
    level: 'Beginner',
    type: 'Technical',
    category: 'Platform Architecture',
    difficulty: 'Easy',
    question: 'What is the difference between JDK, JRE, and JVM in Java?',
    expectedConcepts: [
      'JVM (Java Virtual Machine) executes Java bytecode on target hardware',
      'JRE (Java Runtime Environment) provides JVM plus core libraries needed to run Java apps',
      'JDK (Java Development Kit) includes JRE plus development tools like javac and debugger'
    ],
    expectedKeywords: ['jdk', 'jre', 'jvm', 'bytecode', 'javac', 'runtime environment', 'development kit', 'platform independence'],
    benchmarkAnswer: 'JVM (Java Virtual Machine) is the abstract execution engine that translates compiled bytecode (.class files) into native machine code. JRE (Java Runtime Environment) bundles the JVM along with core Java libraries and resources required to run Java applications. JDK (Java Development Kit) is the comprehensive toolset for developers containing the JRE, compiler (javac), debugger, and utilities needed to develop and compile code.'
  },
  {
    id: 'java-beg-2',
    role: 'Java Developer',
    level: 'Beginner',
    type: 'Technical',
    category: 'Memory & Equality',
    difficulty: 'Easy',
    question: 'What is the difference between == and the .equals() method in Java?',
    expectedConcepts: [
      '== compares reference identity (memory addresses) for objects and values for primitives',
      '.equals() evaluates logical or semantic value equality as overridden by classes',
      'String pool behavior can make == misleading with strings'
    ],
    expectedKeywords: ['==', 'equals', 'reference comparison', 'value equality', 'memory address', 'string pool', 'override', 'hashcode'],
    benchmarkAnswer: 'In Java, == is a reference comparison operator when used with objects, verifying whether both variables point to the identical memory address on the heap (for primitives, it directly compares raw values). The .equals() method is designed for logical or content equality, allowing classes like String, Integer, or custom domain models to evaluate whether their internal field values match.'
  },
  {
    id: 'java-beg-3',
    role: 'Java Developer',
    level: 'Beginner',
    type: 'Technical',
    category: 'Collections Framework',
    difficulty: 'Easy',
    question: 'What is the difference between an ArrayList and a LinkedList in Java?',
    expectedConcepts: [
      'ArrayList is backed by a dynamic resizing array with O(1) random access',
      'LinkedList is implemented as a doubly-linked list with O(1) insertion/deletion at pointers but O(n) search',
      'ArrayList has lower memory overhead due to contiguous memory allocation'
    ],
    expectedKeywords: ['arraylist', 'linkedlist', 'dynamic array', 'doubly linked list', 'random access', 'o(1)', 'o(n)', 'memory overhead'],
    benchmarkAnswer: 'ArrayList is backed by an internal resizable array, offering fast O(1) random access via index, but requires O(n) element shifting for arbitrary insertions or deletions. LinkedList is implemented as a doubly-linked list of node pointers, offering O(1) insertions or deletions when already positioned at a node, but requires O(n) traversal for index-based access. ArrayList also exhibits superior CPU cache locality and lower memory overhead.'
  },
  // Intermediate
  {
    id: 'java-int-1',
    role: 'Java Developer',
    level: 'Intermediate',
    type: 'Technical',
    category: 'JVM & Concurrency',
    difficulty: 'Medium',
    question: 'Explain how Java Garbage Collection works and the role of Young, Old, and Metaspace generations.',
    expectedConcepts: [
      'Heap is segmented into Young Generation (Eden, Survivor spaces) and Old Generation',
      'Minor GC collects short-lived objects in Young Gen; survivors promote to Old Gen',
      'Major/Full GC collects Old Gen; Metaspace holds class metadata off-heap',
      'Popular collectors include G1, ZGC, and Shenandoah'
    ],
    expectedKeywords: ['garbage collection', 'heap', 'young generation', 'eden', 'survivor', 'old generation', 'metaspace', 'minor gc', 'full gc'],
    benchmarkAnswer: 'Java automatic memory management relies on the weak generational hypothesis that most objects die young. The heap is partitioned into the Young Generation (comprising Eden space and two Survivor spaces S0/S1) and the Tenured/Old Generation. New objects are allocated in Eden; Minor GCs scavenge survivors across S0/S1 until aging thresholds promote long-lived objects to Old Gen. Full GCs reclaim unreferenced Old Gen objects. Metaspace resides in native memory to store loaded class bytecode metadata.'
  },
  {
    id: 'java-int-2',
    role: 'Java Developer',
    level: 'Intermediate',
    type: 'Technical',
    category: 'Spring Framework',
    difficulty: 'Medium',
    question: 'What is Dependency Injection (DI) and Inversion of Control (IoC) in the Spring Framework?',
    expectedConcepts: [
      'IoC transfers object lifecycle management to a framework container',
      'DI is the design pattern where dependencies are injected into a component rather than instantiated directly',
      'Spring implements this via ApplicationContext, @Autowired, constructor injection, and beans'
    ],
    expectedKeywords: ['ioc', 'inversion of control', 'dependency injection', 'spring container', 'applicationcontext', 'beans', 'autowired', 'loose coupling'],
    benchmarkAnswer: 'Inversion of Control (IoC) is a design principle where the control of object creation, configuration, and lifecycle is inverted from application code to a dedicated container (the Spring IoC Container / ApplicationContext). Dependency Injection (DI) is the concrete implementation mechanism where the container injects required dependent beans into target components via constructors, setters, or fields. This decouples classes, promotes loose coupling, and simplifies automated unit testing with mocks.'
  },
  // Advanced
  {
    id: 'java-adv-1',
    role: 'Java Developer',
    level: 'Advanced',
    type: 'Technical',
    category: 'Concurrency Internals',
    difficulty: 'Hard',
    question: 'Explain the Java Memory Model (JMM), the volatile keyword, and happens-before relationships.',
    expectedConcepts: [
      'JMM defines how threads interact through memory and hardware CPU caches',
      'volatile guarantees variable visibility across CPU caches and prevents instruction reordering',
      'happens-before guarantees that memory writes by one thread are guaranteed visible to another'
    ],
    expectedKeywords: ['jmm', 'java memory model', 'volatile', 'visibility', 'happens-before', 'instruction reordering', 'cpu cache', 'synchronized'],
    benchmarkAnswer: 'The Java Memory Model (JMM) specifies the semantic rules under which one thread is guaranteed to observe changes written to shared variables by another thread across modern multi-core CPU architectures with multi-level hardware caches. The volatile keyword provides two guarantees: visibility (every read is fetched from main memory, every write flushes to main memory) and ordering (prevents compiler and CPU instruction reordering via memory barriers). The JMM formalizes these guarantees through the "happens-before" relationship, ensuring coordinated state transitions without full lock contention.'
  },

  // ==================== WEB DEVELOPER ====================
  // Beginner
  {
    id: 'web-beg-1',
    role: 'Web Developer',
    level: 'Beginner',
    type: 'Technical',
    category: 'Browser Architecture',
    difficulty: 'Easy',
    question: 'What is the DOM and what happens during the browser rendering pipeline?',
    expectedConcepts: [
      'DOM (Document Object Model) is a tree representation of HTML nodes in memory',
      'Pipeline steps: HTML parsing (DOM) + CSS parsing (CSSOM) -> Render Tree -> Layout -> Paint -> Compositing'
    ],
    expectedKeywords: ['dom', 'cssom', 'render tree', 'layout', 'paint', 'compositing', 'reflow', 'repaint', 'html'],
    benchmarkAnswer: 'The DOM (Document Object Model) is an in-memory, tree-structured programmatic representation of an HTML document exposed to JavaScript. The rendering pipeline begins when the browser parses HTML into the DOM tree and styles into the CSSOM tree. These combine to form the Render Tree of visible nodes. Next, the browser computes geometric dimensions and coordinates in the Layout (or Reflow) phase, paints vector pixels into layers during the Paint phase, and finally merges layers onto the screen during Compositing.'
  },
  {
    id: 'web-beg-2',
    role: 'Web Developer',
    level: 'Beginner',
    type: 'Technical',
    category: 'JavaScript Basics',
    difficulty: 'Easy',
    question: 'What is the difference between var, let, and const in JavaScript?',
    expectedConcepts: [
      'var is function-scoped and hoisted with undefined initialization',
      'let and const are block-scoped and exist in the Temporal Dead Zone (TDZ) before declaration',
      'const prevents variable re-assignment, though object properties remain mutable'
    ],
    expectedKeywords: ['var', 'let', 'const', 'block scope', 'function scope', 'hoisting', 'temporal dead zone', 'mutation'],
    benchmarkAnswer: 'var has function scope, can be redeclared, and is hoisted with an initial value of undefined. In contrast, let and const feature strict block scope {} and cannot be accessed before their declaration due to the Temporal Dead Zone (TDZ). Furthermore, const creates an immutable binding that prohibits variable reassignment, though nested properties of mutable objects and arrays assigned to const can still be modified.'
  },
  // Intermediate
  {
    id: 'web-int-1',
    role: 'Web Developer',
    level: 'Intermediate',
    type: 'Technical',
    category: 'React Internals',
    difficulty: 'Medium',
    question: 'How does React Virtual DOM and the reconciliation algorithm work?',
    expectedConcepts: [
      'Virtual DOM is a lightweight JavaScript object representation of the real UI tree',
      'When state changes, a new VDOM tree is created and diffed against the previous tree',
      'Reconciliation applies optimal minimal DOM mutations using heuristics (keys, element types)'
    ],
    expectedKeywords: ['virtual dom', 'reconciliation', 'diffing algorithm', 'fiber', 'keys', 'rerender', 'dom mutation', 'batching'],
    benchmarkAnswer: 'The Virtual DOM is a lightweight in-memory tree of JavaScript objects mirroring the actual browser DOM. When component state or props change, React generates a fresh Virtual DOM representation and executes its diffing reconciliation algorithm against the previous snapshot. By leveraging heuristic assumptions—such as element type identity and unique stable keys in lists—React calculates the minimal set of real DOM operations required, batching DOM updates efficiently.'
  },
  {
    id: 'web-int-2',
    role: 'Web Developer',
    level: 'Intermediate',
    type: 'Technical',
    category: 'Web Performance & Security',
    difficulty: 'Medium',
    question: 'What are Cross-Origin Resource Sharing (CORS) and Cross-Site Scripting (XSS), and how are they mitigated?',
    expectedConcepts: [
      'CORS is a browser security mechanism that restricts HTTP requests across distinct origins via headers',
      'Preflight OPTIONS requests check server permissions (Access-Control-Allow-Origin)',
      'XSS allows attackers to inject malicious scripts into trusted websites',
      'XSS mitigation includes output encoding, Content Security Policy (CSP), and sanitization'
    ],
    expectedKeywords: ['cors', 'xss', 'same-origin policy', 'preflight', 'access-control-allow-origin', 'content security policy', 'sanitization', 'injection'],
    benchmarkAnswer: 'CORS is a browser-enforced mechanism extending the Same-Origin Policy, allowing servers to declare permitted external origins using HTTP response headers like Access-Control-Allow-Origin, using preflight OPTIONS requests for non-simple calls. XSS (Cross-Site Scripting) is a vulnerability where malicious scripts are injected into web pages viewed by other users. Mitigation requires contextual output encoding, strict Content Security Policy (CSP) headers, input sanitization, and setting httpOnly flags on sensitive authentication cookies.'
  },
  // Advanced
  {
    id: 'web-adv-1',
    role: 'Web Developer',
    level: 'Advanced',
    type: 'Technical',
    category: 'Core Web Vitals & Hydration',
    difficulty: 'Hard',
    question: 'Explain Core Web Vitals (LCP, INP, CLS) and how Server-Side Rendering (SSR) streaming and selective hydration optimize them.',
    expectedConcepts: [
      'LCP (Largest Contentful Paint) measures loading speed of primary visual content',
      'INP (Interaction to Next Paint) measures page responsiveness to user interactions',
      'CLS (Cumulative Layout Shift) measures visual stability and unexpected layout jumps',
      'Streaming SSR and selective hydration allow sending HTML chunks early and attaching event handlers progressively'
    ],
    expectedKeywords: ['lcp', 'inp', 'cls', 'core web vitals', 'ssr', 'streaming', 'selective hydration', 'suspense', 'ttfb', 'main thread'],
    benchmarkAnswer: 'Core Web Vitals are Google standardized metrics measuring real-world user experience: Largest Contentful Paint (LCP < 2.5s) measures perceived load performance, Interaction to Next Paint (INP < 200ms) tracks interaction responsiveness, and Cumulative Layout Shift (CLS < 0.1) evaluates visual layout stability. Modern frameworks improve these metrics through React Server Components and streaming SSR with Suspense: HTML shells are streamed progressively over HTTP chunking to drastically lower TTFB and improve LCP, while selective hydration prioritizes interactive components based on user clicks rather than blocking the main thread with a monolithic JavaScript bundle.'
  },

  // ==================== DATA ANALYST ====================
  // Beginner
  {
    id: 'da-beg-1',
    role: 'Data Analyst',
    level: 'Beginner',
    type: 'Technical',
    category: 'SQL Fundamentals',
    difficulty: 'Easy',
    question: 'What is the difference between WHERE and HAVING clauses in SQL?',
    expectedConcepts: [
      'WHERE filters individual rows before any grouping or aggregation takes place',
      'HAVING filters aggregated groups after GROUP BY operations',
      'HAVING can evaluate aggregate functions like COUNT, SUM, AVG'
    ],
    expectedKeywords: ['where', 'having', 'group by', 'aggregate functions', 'filtering', 'rows', 'groups', 'count', 'sum'],
    benchmarkAnswer: 'In SQL, WHERE filters individual table rows prior to aggregation or grouping, and cannot be used directly with aggregate functions like SUM() or COUNT(). In contrast, HAVING filters the summarized groups generated by a GROUP BY clause, operating after aggregation and enabling condition checks on aggregate calculations.'
  },
  {
    id: 'da-beg-2',
    role: 'Data Analyst',
    level: 'Beginner',
    type: 'Technical',
    category: 'Data Wrangling',
    difficulty: 'Easy',
    question: 'How do you handle missing values in a dataset using Pandas?',
    expectedConcepts: [
      'Detection using isna() or isnull()',
      'Deletion via dropna() (by row or column)',
      'Imputation with fillna() using mean, median, mode, or forward/backward fill',
      'Understanding Missing Completely at Random (MCAR) vs Missing at Random (MAR)'
    ],
    expectedKeywords: ['pandas', 'dropna', 'fillna', 'isna', 'isnull', 'imputation', 'mean', 'median', 'mode', 'missing values'],
    benchmarkAnswer: 'In Pandas, missing values are identified using isna() or isnull(). They can be addressed by either removing contaminated records using dropna() (when missingness is minimal) or imputing values using fillna() or interpolate(). Numerical imputation typically uses mean (for symmetric distributions) or median (robust against outliers), while categorical data uses the mode or a dedicated "Unknown" class.'
  },
  // Intermediate
  {
    id: 'da-int-1',
    role: 'Data Analyst',
    level: 'Intermediate',
    type: 'Technical',
    category: 'SQL Window Functions',
    difficulty: 'Medium',
    question: 'What are SQL window functions, and how do ROW_NUMBER, RANK, and DENSE_RANK differ?',
    expectedConcepts: [
      'Window functions compute values across sets of rows related to the current row without collapsing them like GROUP BY',
      'ROW_NUMBER gives sequential consecutive integers without ties',
      'RANK assigns identical numbers to ties and skips subsequent positions',
      'DENSE_RANK assigns identical numbers to ties without skipping subsequent integers'
    ],
    expectedKeywords: ['window functions', 'over', 'partition by', 'order by', 'row_number', 'rank', 'dense_rank', 'ties', 'consecutive'],
    benchmarkAnswer: 'Window functions perform calculations across a partition of table records while retaining the original individual row identities (unlike GROUP BY which collapses rows). They are invoked using the OVER(PARTITION BY ... ORDER BY ...) clause. ROW_NUMBER assigns unique, strictly sequential integers regardless of tied values. RANK assigns equal ranks to identical values but leaves gaps in subsequent rankings (e.g., 1, 2, 2, 4). DENSE_RANK also assigns duplicate numbers for ties but never skips ranking numbers (e.g., 1, 2, 2, 3).'
  },
  // Advanced
  {
    id: 'da-adv-1',
    role: 'Data Analyst',
    level: 'Advanced',
    type: 'Technical',
    category: 'Statistical Analysis & Experimentation',
    difficulty: 'Hard',
    question: 'How do you design and evaluate an A/B test, including sample size determination, p-values, and statistical power?',
    expectedConcepts: [
      'Define null hypothesis (H0) and alternative hypothesis (H1)',
      'Calculate sample size based on Minimum Detectable Effect (MDE), significance level (alpha), and statistical power (1 - beta)',
      'Run test, check for sample ratio mismatch (SRM), compute test statistic (t-test / z-test)',
      'Evaluate p-value against alpha threshold (0.05) and inspect confidence intervals'
    ],
    expectedKeywords: ['a/b testing', 'hypothesis testing', 'null hypothesis', 'p-value', 'statistical power', 'significance level', 'sample size', 'mde', 'confidence interval'],
    benchmarkAnswer: 'Designing a rigorous A/B test begins by formulating a clear null hypothesis (H0) and alternative hypothesis (H1) centered on a primary KPI. Pre-experiment power analysis calculates required sample size using baseline conversion, Minimum Detectable Effect (MDE), significance level (alpha = 0.05), and statistical power (1 - beta = 0.80). Users are randomly split into control and treatment variants. During evaluation, we check for Sample Ratio Mismatch (SRM) to ensure clean randomization, then perform two-sample hypothesis tests (z-test or t-test). If the p-value is less than alpha and confidence intervals are bounded positively, we reject H0.'
  },

  // ==================== MACHINE LEARNING ENGINEER ====================
  // Beginner
  {
    id: 'ml-beg-1',
    role: 'Machine Learning Engineer',
    level: 'Beginner',
    type: 'Technical',
    category: 'Core Concepts',
    difficulty: 'Easy',
    question: 'What is the difference between supervised, unsupervised, and reinforcement learning?',
    expectedConcepts: [
      'Supervised: Model learns from labeled ground-truth training pairs (classification, regression)',
      'Unsupervised: Model discovers hidden patterns or clusters in unlabeled data (k-means, PCA)',
      'Reinforcement: Agent learns optimal policy through trial-and-error rewards and penalties in an environment'
    ],
    expectedKeywords: ['supervised learning', 'unsupervised learning', 'reinforcement learning', 'labeled data', 'clustering', 'agent', 'reward', 'policy'],
    benchmarkAnswer: 'In supervised learning, algorithms are trained on labeled data pairs (features and target targets), learning a mapping function for classification or regression. In unsupervised learning, data possesses no predefined target labels; the algorithm identifies inherent structures, groupings, or dimensionality reductions (such as K-Means or PCA). In reinforcement learning, an autonomous agent interacts with a dynamic environment, learning optimal sequential decision policies through cumulative reward signals and penalty feedback.'
  },
  {
    id: 'ml-beg-2',
    role: 'Machine Learning Engineer',
    level: 'Beginner',
    type: 'Technical',
    category: 'Model Evaluation',
    difficulty: 'Easy',
    question: 'What is overfitting and how do you prevent it in machine learning models?',
    expectedConcepts: [
      'Overfitting occurs when a model memorizes noise in training data, generalizing poorly to unseen data',
      'High variance and low training error accompanied by high test error',
      'Mitigations include cross-validation, regularization (L1/L2), dropout, pruning, early stopping, and more training data'
    ],
    expectedKeywords: ['overfitting', 'generalization', 'high variance', 'regularization', 'l1', 'l2', 'cross-validation', 'dropout', 'early stopping'],
    benchmarkAnswer: 'Overfitting occurs when a model learns the detailed noise and idiosyncratic patterns of training data to the extent that it impairs performance on unseen test datasets (high variance, low bias). It is identified when training loss decreases while validation loss diverges. Prevention techniques include data augmentation, gathering more training samples, cross-validation, regularization penalties (L1 Lasso / L2 Ridge), early stopping during iterative optimization, tree pruning, and dropout in neural networks.'
  },
  // Intermediate
  {
    id: 'ml-int-1',
    role: 'Machine Learning Engineer',
    level: 'Intermediate',
    type: 'Technical',
    category: 'Optimization & Loss',
    difficulty: 'Medium',
    question: 'Explain the bias-variance tradeoff and how it relates to model complexity.',
    expectedConcepts: [
      'Bias is error stemming from overly simplistic assumptions (underfitting)',
      'Variance is error stemming from excessive sensitivity to training data fluctuations (overfitting)',
      'Total error = Bias^2 + Variance + Irreducible error',
      'Sweet spot balances complexity to minimize generalization error'
    ],
    expectedKeywords: ['bias', 'variance', 'bias-variance tradeoff', 'model complexity', 'underfitting', 'overfitting', 'irreducible error', 'generalization'],
    benchmarkAnswer: 'The bias-variance tradeoff describes the tension between two sources of error in predictive modeling. Bias is error introduced by approximating real-world complex phenomena with oversimplified model assumptions, causing underfitting. Variance is error originating from model hyper-sensitivity to random fluctuations in the training dataset, causing overfitting. Total expected generalization error is the sum of squared bias, variance, and irreducible noise. As model complexity increases, bias declines while variance escalates, requiring hyperparameter tuning to find the optimal minimum total error.'
  },
  // Advanced
  {
    id: 'ml-adv-1',
    role: 'Machine Learning Engineer',
    level: 'Advanced',
    type: 'Technical',
    category: 'Deep Learning & Transformers',
    difficulty: 'Hard',
    question: 'Explain the Transformer architecture, particularly the Scaled Dot-Product and Multi-Head Attention mechanisms.',
    expectedConcepts: [
      'Query (Q), Key (K), and Value (V) linear projections',
      'Attention formula: softmax(QK^T / sqrt(d_k)) * V',
      'Scaling by sqrt(d_k) prevents vanishing gradients in softmax for large dimensions',
      'Multi-head attention projects into multiple subspaces, allowing parallel focus on different positions and semantic relationships'
    ],
    expectedKeywords: ['transformer', 'self-attention', 'scaled dot-product', 'multi-head attention', 'query', 'key', 'value', 'softmax', 'positional encoding'],
    benchmarkAnswer: 'The Transformer architecture replaces recurrent architectures with self-attention. For an input sequence, linear projections create Query (Q), Key (K), and Value (V) matrices. In Scaled Dot-Product Attention, similarity weights are computed via QK^T, scaled by the square root of key dimension d_k to prevent extreme softmax saturation with vanishing gradients, and multiplied by V: Attention(Q,K,V) = softmax(QK^T / sqrt(d_k))V. Multi-Head Attention projects Q, K, and V into h distinct parameter subspaces in parallel, allowing the network to simultaneously attend to information from different representation subspaces and sequence positions before concatenating and projecting back.'
  },

  // ==================== SOFTWARE ENGINEER ====================
  // Beginner
  {
    id: 'se-beg-1',
    role: 'Software Engineer',
    level: 'Beginner',
    type: 'Technical',
    category: 'Data Structures & Algorithms',
    difficulty: 'Easy',
    question: 'What is Big O notation, and what are the time complexities of binary search versus linear search?',
    expectedConcepts: [
      'Big O notation characterizes asymptotic upper bound time or space scaling as input size n grows',
      'Linear search examines elements one-by-one: O(n) time complexity',
      'Binary search repeatedly halves a sorted search space: O(log n) time complexity'
    ],
    expectedKeywords: ['big o', 'time complexity', 'linear search', 'binary search', 'o(n)', 'o(log n)', 'sorted array', 'asymptotic'],
    benchmarkAnswer: 'Big O notation is a mathematical notation used in computer science to classify algorithms according to their worst-case asymptotic runtime or space requirements as input size n grows toward infinity. Linear search scans an unsorted array sequentially from start to finish, yielding O(n) linear time complexity. Binary search operates on pre-sorted collections by continuously halving the candidate search interval, yielding O(log n) logarithmic time complexity.'
  },
  // Intermediate
  {
    id: 'se-int-1',
    role: 'Software Engineer',
    level: 'Intermediate',
    type: 'Technical',
    category: 'Design Principles',
    difficulty: 'Medium',
    question: 'Explain the SOLID principles in software engineering with a brief description of each.',
    expectedConcepts: [
      'S: Single Responsibility Principle (one reason to change)',
      'O: Open/Closed Principle (open for extension, closed for modification)',
      'L: Liskov Substitution Principle (subtypes substitutable for base types)',
      'I: Interface Segregation Principle (clients should not depend on unused interfaces)',
      'D: Dependency Inversion Principle (depend on abstractions, not concretions)'
    ],
    expectedKeywords: ['solid', 'single responsibility', 'open closed', 'liskov substitution', 'interface segregation', 'dependency inversion', 'refactoring', 'maintainability'],
    benchmarkAnswer: 'SOLID represents five foundational object-oriented design principles: Single Responsibility (a class should have one and only one reason to change); Open/Closed (software entities should be open for extension but closed for source modification); Liskov Substitution (subclasses must be substitutable for their superclasses without breaking program correctness); Interface Segregation (many client-specific interfaces are better than one general-purpose bloated interface); and Dependency Inversion (high-level modules should depend upon abstractions rather than low-level concrete implementations).'
  },
  // Advanced
  {
    id: 'se-adv-1',
    role: 'Software Engineer',
    level: 'Advanced',
    type: 'Technical',
    category: 'System Design',
    difficulty: 'Hard',
    question: 'How do you design a distributed caching layer, and what strategies address cache invalidation, cache stampede, and cache penetration?',
    expectedConcepts: [
      'Caching patterns: Cache-Aside, Write-Through, Write-Behind',
      'Cache invalidation via TTL, versioning, or event-driven invalidation (pub/sub)',
      'Cache stampede (thundering herd) resolved via mutex locking, probabilistic early expiration (XFetch)',
      'Cache penetration resolved via Bloom filters or caching null results'
    ],
    expectedKeywords: ['distributed cache', 'redis', 'cache-aside', 'cache invalidation', 'cache stampede', 'cache penetration', 'bloom filter', 'ttl', 'thundering herd'],
    benchmarkAnswer: 'A distributed caching architecture (such as Redis or Memcached clusters) typically implements the Cache-Aside pattern, reading from cache first and querying persistent storage upon cache misses. Cache invalidation is handled via bounded TTLs combined with change-data-capture event streams that evict keys on write. To combat cache stampede (thundering herd problem when popular keys expire under heavy traffic), systems employ distributed mutex locks so only a single thread recomputes the key, or use probabilistic early expiration algorithms like XFetch. To resolve cache penetration (repeated queries for non-existent entities bypassing cache), we deploy Bloom filters at the ingress or store empty null values with short TTLs.'
  },

  // ==================== DEDICATED HR / COMMUNICATION QUESTION BANK ====================
  // 20 Realistic HR interview questions structured in natural interview progression:
  // 1. Tell me about yourself.
  {
    id: 'hr-core-1',
    role: 'General Interview',
    level: 'Beginner',
    type: 'HR',
    category: 'Self Introduction',
    difficulty: 'Easy',
    question: 'Tell me about yourself.',
    expectedConcepts: [
      'Overview of current professional/academic background',
      'Key technical skills and relevant projects completed',
      'Career motivations and enthusiasm for the position'
    ],
    expectedKeywords: ['experience', 'background', 'projects', 'skills', 'passion', 'learning', 'developer', 'interest', 'career', 'education'],
    benchmarkAnswer: 'I am a dedicated software developer with a strong foundation in building reliable applications and solving algorithmic problems. Over the past few years, I have worked on projects spanning data processing, backend services, and web applications. What drives me is translating real-world problems into clean, maintainable software. Outside of coding, I actively contribute to collaborative engineering teams, and I am excited about this opportunity to expand my technical depth and contribute meaningfully to your team.'
  },

  // 2. Can you walk me through your educational background?
  {
    id: 'hr-core-2-edu',
    role: 'General Interview',
    level: 'Beginner',
    type: 'HR',
    category: 'Educational Background',
    difficulty: 'Easy',
    question: 'Can you walk me through your educational background?',
    expectedConcepts: [
      'Formal degree, major, and foundational coursework in computer science or related engineering',
      'Academic projects, laboratory coursework, or practical application of concepts',
      'Self-directed learning, industry certifications, or continuous skill enhancement'
    ],
    expectedKeywords: ['education', 'degree', 'computer science', 'coursework', 'algorithms', 'data structures', 'projects', 'academic', 'learning', 'university'],
    benchmarkAnswer: 'I hold a degree in Computer Science where I built a solid conceptual foundation in core computer science disciplines, including data structures, algorithms, database management, and computer networks. During my studies, I prioritized hands-on laboratory projects where I could apply theoretical computer science concepts to real-world software development. Beyond the standard curriculum, I pursued self-guided courses and technical certifications in modern web frameworks and cloud architectures to bridge academic learning with practical engineering practices.'
  },

  // 3. What are your strengths?
  {
    id: 'hr-core-3',
    role: 'General Interview',
    level: 'Beginner',
    type: 'HR',
    category: 'Self Awareness',
    difficulty: 'Easy',
    question: 'What are your strengths?',
    expectedConcepts: [
      'Core technical strengths backed by practical examples',
      'Soft skills such as clear communication, adaptability, and reliability',
      'Strong problem-solving methodology and attention to detail'
    ],
    expectedKeywords: ['strengths', 'problem-solving', 'adaptability', 'communication', 'detail', 'consistency', 'learning', 'teamwork', 'analytical'],
    benchmarkAnswer: 'My greatest strengths are my analytical problem-solving mindset, fast learning ability, and disciplined approach to teamwork. When tackling unfamiliar issues or complex bugs, I systematically isolate root causes rather than applying surface-level patches. Additionally, I communicate clearly with teammates and stakeholders to ensure expectations and timelines remain transparent and aligned.'
  },

  // 4. What is one weakness or area you are working to improve?
  {
    id: 'hr-core-4',
    role: 'General Interview',
    level: 'Intermediate',
    type: 'HR',
    category: 'Constructive Self-Improvement',
    difficulty: 'Medium',
    question: 'What is one weakness or area you are working to improve?',
    expectedConcepts: [
      'Genuine self-awareness of an authentic development area',
      'Proactive and concrete actions being taken to improve',
      'Positive progress demonstrated through recent experiences'
    ],
    expectedKeywords: ['weakness', 'improve', 'growth', 'feedback', 'action', 'practice', 'progress', 'delegation', 'public speaking', 'documentation', 'learning'],
    benchmarkAnswer: 'An area I have been actively working to improve is delegating tasks and presenting technical updates to broader non-technical audiences. In the past, I tended to dive into technical jargon during demos. To address this, I have been practicing structuring presentations around business value and impact first, using visual diagrams, and seeking feedback from cross-functional peers to refine my delivery.'
  },

  // 5. Why are you interested in this role?
  {
    id: 'hr-core-2',
    role: 'General Interview',
    level: 'Beginner',
    type: 'HR',
    category: 'Role Motivation',
    difficulty: 'Easy',
    question: 'Why are you interested in this role?',
    expectedConcepts: [
      'Alignment of role requirements with candidate strengths',
      'Interest in the technology stack, product domain, or team mission',
      'Desire for continuous learning and professional contribution'
    ],
    expectedKeywords: ['role', 'interest', 'alignment', 'opportunity', 'growth', 'impact', 'mission', 'technology', 'strengths', 'contribute'],
    benchmarkAnswer: 'I am drawn to this role because it aligns directly with my technical capabilities and career ambitions. The work your engineering team does in building scalable and reliable systems presents exciting engineering challenges. I want to contribute my skills in problem-solving and software development while collaborating with a talented team where continuous learning and high standards are valued.'
  },

  // 6. Tell me about a project you have worked on.
  {
    id: 'hr-core-6-project',
    role: 'General Interview',
    level: 'Intermediate',
    type: 'HR',
    category: 'Project Experience',
    difficulty: 'Medium',
    question: 'Tell me about a project you have worked on.',
    expectedConcepts: [
      'Clear context, problem statement, and objective of the project',
      'Technical architecture, tools, and methodologies implemented',
      'Measurable outcomes, user impact, or performance improvements achieved'
    ],
    expectedKeywords: ['project', 'architecture', 'implementation', 'technologies', 'outcome', 'impact', 'problem', 'solution', 'features', 'data'],
    benchmarkAnswer: 'I worked on a full-stack task and resource management application designed to streamline team project tracking. We noticed that team members frequently suffered from misaligned deadlines and fragmented communication. I designed the modular REST API backend, structured the database schemas with optimized indexing, and built a reactive frontend interface. The final application reduced task update friction by 40% and gave project leads real-time visibility into active sprints.'
  },

  // 7. What was your role in that project?
  {
    id: 'hr-core-7-role',
    role: 'General Interview',
    level: 'Intermediate',
    type: 'HR',
    category: 'Individual Contribution',
    difficulty: 'Medium',
    question: 'What was your role in that project?',
    expectedConcepts: [
      'Specific ownership areas and deliverables responsible for',
      'Collaboration with peers, code reviews, and integration tasks',
      'Technical decision-making and accountability for results'
    ],
    expectedKeywords: ['role', 'responsibility', 'ownership', 'backend', 'frontend', 'architecture', 'collaboration', 'contribution', 'delivered', 'reviewed'],
    benchmarkAnswer: 'As the lead developer on the backend and database layer, my primary responsibility was designing the data models, implementing API endpoints, and ensuring secure authentication workflows. I wrote comprehensive unit and integration tests for critical paths and participated in daily standups and code reviews to unblock frontend teammates. I also handled deploying the containerized microservices to our staging environment.'
  },

  // 8. What challenges did you face during the project?
  {
    id: 'hr-core-8-challenges',
    role: 'General Interview',
    level: 'Intermediate',
    type: 'HR',
    category: 'Problem Solving & Resilience',
    difficulty: 'Medium',
    question: 'What challenges did you face during the project?',
    expectedConcepts: [
      'Concrete technical or logistical roadblock encountered',
      'Analytical approach to diagnosing the issue and evaluating trade-offs',
      'Resolution achieved and lasting knowledge gained'
    ],
    expectedKeywords: ['challenges', 'bottleneck', 'performance', 'debugging', 'solution', 'resolved', 'trade-offs', 'testing', 'lessons', 'latency'],
    benchmarkAnswer: 'A major challenge we encountered was severe latency spikes during bulk data imports when the database locked tables under concurrent user reads. To resolve this, I profiled the query execution plans, identified missing indexes, and restructured the batch ingestion into an asynchronous queue with chunked transactions. This dropped our peak query times from over four seconds down to under 200 milliseconds without locking active user tables.'
  },

  // 9. How do you handle pressure and deadlines?
  {
    id: 'hr-core-9-pressure',
    role: 'General Interview',
    level: 'Beginner',
    type: 'HR',
    category: 'Stress Management & Deadlines',
    difficulty: 'Easy',
    question: 'How do you handle pressure and deadlines?',
    expectedConcepts: [
      'Maintaining composure and objective focus during high-stress situations',
      'Breaking high-stakes deliverables into prioritized milestones',
      'Proactive communication and asking for assistance when necessary'
    ],
    expectedKeywords: ['pressure', 'deadlines', 'prioritize', 'calm', 'milestones', 'focus', 'communication', 'planning', 'delivery', 'stress'],
    benchmarkAnswer: 'When facing tight deadlines or high-pressure situations, I stay calm by focusing on actionable steps rather than anxiety. I break the deadline into clear daily milestones, eliminate non-essential scope, and protect uninterrupted focus time for critical development blocks. Crucially, I communicate early with project leads if risks surface, ensuring there are no last-minute surprises.'
  },

  // 10. How do you work in a team?
  {
    id: 'hr-core-9',
    role: 'General Interview',
    level: 'Beginner',
    type: 'HR',
    category: 'Team Collaboration',
    difficulty: 'Easy',
    question: 'How do you work in a team?',
    expectedConcepts: [
      'Active listening and respectful cross-functional communication',
      'Shared responsibility and supporting colleagues during bottlenecks',
      'Embracing peer feedback through thorough code reviews and standups'
    ],
    expectedKeywords: ['team', 'teamwork', 'collaboration', 'listening', 'support', 'communication', 'respect', 'feedback', 'shared goals'],
    benchmarkAnswer: 'I believe effective teamwork rests on active listening, clear communication, and mutual accountability. In team settings, I participate actively in planning and standups, offer assistance to colleagues when their workloads peak, and maintain thorough documentation. I welcome constructive feedback during reviews and believe diverse perspectives consistently lead to higher quality solutions.'
  },

  // 11. How would you handle a disagreement with a teammate?
  {
    id: 'hr-core-11-disagreement',
    role: 'General Interview',
    level: 'Intermediate',
    type: 'HR',
    category: 'Conflict Resolution',
    difficulty: 'Medium',
    question: 'How would you handle a disagreement with a teammate?',
    expectedConcepts: [
      'Focusing on the technical or business problem rather than personalities',
      'Actively listening to understand the other perspective and underlying concerns',
      'Using data, prototypes, or objective criteria to reach consensus and commit'
    ],
    expectedKeywords: ['disagreement', 'teammate', 'conflict', 'listen', 'objective', 'data', 'compromise', 'respect', 'consensus', 'perspective'],
    benchmarkAnswer: 'When a disagreement arises with a teammate, I approach it with empathy and curiosity rather than defensiveness. I ask open-ended questions to fully understand their perspective and technical reasoning. If our disagreement is over architecture or tool choices, I suggest evaluating both approaches against objective criteria such as performance, maintainability, and delivery timelines. Once the team agrees on a direction, I commit fully to making it successful.'
  },

  // 12. What motivates you to learn new things?
  {
    id: 'hr-core-12-learning',
    role: 'General Interview',
    level: 'Beginner',
    type: 'HR',
    category: 'Curiosity & Growth Mindset',
    difficulty: 'Easy',
    question: 'What motivates you to learn new things?',
    expectedConcepts: [
      'Intrinsic curiosity about technology and building better solutions',
      'Desire to solve complex problems more efficiently',
      'Keeping pace with evolving industry standards and tools'
    ],
    expectedKeywords: ['motivates', 'learning', 'curiosity', 'growth', 'innovation', 'technology', 'improvement', 'problem solving', 'challenges', 'knowledge'],
    benchmarkAnswer: 'What motivates me most is curiosity and the desire to build more elegant, resilient solutions. Technology moves quickly, and learning a new language, design pattern, or tool gives me a fresh lens for solving problems that previously seemed difficult. Seeing the direct impact of newly acquired knowledge—whether it is speeding up an algorithm or building a smoother user interface—is deeply rewarding and drives me to keep learning continuously.'
  },

  // 13. What are your short-term and long-term goals?
  {
    id: 'hr-core-13-goals',
    role: 'General Interview',
    level: 'Intermediate',
    type: 'HR',
    category: 'Career Planning',
    difficulty: 'Medium',
    question: 'What are your short-term and long-term goals?',
    expectedConcepts: [
      'Realistic short-term goals: onboarding efficiently, delivering quality features, mastering the stack',
      'Thoughtful long-term goals: technical leadership, system architecture, mentoring peers',
      'Commitment to continuous value creation and organizational impact'
    ],
    expectedKeywords: ['short-term', 'long-term', 'goals', 'career', 'architecture', 'leadership', 'skills', 'mastery', 'growth', 'contribution'],
    benchmarkAnswer: 'In the short term, my goal is to onboard efficiently, master your team’s codebase and deployment practices, and start delivering high-quality, tested features that add immediate value. In the long term, over the next three to five years, I aim to grow into a senior engineering or technical lead role where I can architect robust systems, guide technical roadmaps, and mentor emerging developers on the team.'
  },

  // 14. Why should we consider you for this role?
  {
    id: 'hr-core-5',
    role: 'General Interview',
    level: 'Beginner',
    type: 'HR',
    category: 'Candidate Value Proposition',
    difficulty: 'Easy',
    question: 'Why should we consider you for this role?',
    expectedConcepts: [
      'Clear articulation of relevant technical skills and readiness',
      'Commitment to quality, reliability, and collaborative culture',
      'Strong alignment with team goals and problem-solving mindset'
    ],
    expectedKeywords: ['consider', 'skills', 'dedication', 'value', 'contribute', 'reliability', 'culture', 'fit', 'results', 'problem solver'],
    benchmarkAnswer: 'You should consider me because I bring a blend of strong technical fundamentals, disciplined problem-solving, and a collaborative team-first attitude. I do not just write code; I take ownership of the outcomes, thoroughly test edge cases, and communicate proactively. I am ready to hit the ground running and make tangible contributions to your ongoing initiatives.'
  },

  // 15. Where do you see yourself in the next few years?
  {
    id: 'hr-core-15-future',
    role: 'General Interview',
    level: 'Intermediate',
    type: 'HR',
    category: 'Career Vision',
    difficulty: 'Medium',
    question: 'Where do you see yourself in the next few years?',
    expectedConcepts: [
      'Deepening technical mastery and taking ownership of broader architecture',
      'Mentoring junior engineers and facilitating team best practices',
      'Continuous alignment with business impact and company goals'
    ],
    expectedKeywords: ['future', 'years', 'career', 'growth', 'architecture', 'leadership', 'mentorship', 'expertise', 'impact', 'responsibility'],
    benchmarkAnswer: 'In the next few years, I see myself deepening my technical expertise in system design and scalable software engineering. I want to expand from implementing individual features to taking architectural ownership of core service modules and mentoring junior engineers. Ultimately, I want to be recognized as a dependable, go-to engineer who delivers high-impact solutions and fosters a culture of engineering excellence.'
  },

  // 16. Tell me about a mistake you made and what you learned from it.
  {
    id: 'hr-core-16-mistake',
    role: 'General Interview',
    level: 'Intermediate',
    type: 'HR',
    category: 'Accountability & Learning',
    difficulty: 'Medium',
    question: 'Tell me about a mistake you made and what you learned from it.',
    expectedConcepts: [
      'Honest ownership of a genuine mistake without shifting blame',
      'Immediate corrective action taken to contain the problem',
      'Systemic safeguards or improved processes instituted to prevent recurrence'
    ],
    expectedKeywords: ['mistake', 'learned', 'accountability', 'ownership', 'resolution', 'prevention', 'testing', 'safeguard', 'reflection', 'growth'],
    benchmarkAnswer: 'Early in a project, I pushed an environment configuration change directly without testing it against our staging environment first, which caused a temporary build break for other developers. I immediately acknowledged the mistake, rolled back the commit within minutes, and apologized to the team. To prevent similar issues, I implemented a pre-commit validation hook and automated staging verification checks. That experience taught me the critical importance of rigorous deployment hygiene and proactive communication.'
  },

  // 17. How do you prioritize multiple tasks?
  {
    id: 'hr-core-14',
    role: 'General Interview',
    level: 'Intermediate',
    type: 'HR',
    category: 'Task Prioritization',
    difficulty: 'Medium',
    question: 'How do you prioritize multiple tasks?',
    expectedConcepts: [
      'Evaluating tasks by business impact, deadlines, and dependencies',
      'Organizing structured workflows to prevent context switching',
      'Communicating proactively when shifting priorities require realignment'
    ],
    expectedKeywords: ['prioritize', 'tasks', 'urgency', 'impact', 'dependencies', 'focus', 'organization', 'workflow', 'communication', 'deadlines'],
    benchmarkAnswer: 'When managing multiple competing tasks, I assess each by its critical dependencies, business urgency, and anticipated effort. I prioritize blockers that prevent other teammates from moving forward first, then tackle high-impact deliverables during peak focus hours. If conflicting deadlines emerge, I consult with the team lead or project manager to clarify priorities and adjust the schedule realistically.'
  },

  // 18. Do you prefer working independently or in a team? Why?
  {
    id: 'hr-core-18-style',
    role: 'General Interview',
    level: 'Beginner',
    type: 'HR',
    category: 'Working Style Preferences',
    difficulty: 'Easy',
    question: 'Do you prefer working independently or in a team? Why?',
    expectedConcepts: [
      'Balanced perspective recognizing the value of both modes',
      'Independent focus for deep implementation, debugging, and research',
      'Team collaboration for design brainstorming, code reviews, and shared goals'
    ],
    expectedKeywords: ['independently', 'team', 'why', 'balance', 'collaboration', 'focus', 'ownership', 'discussion', 'brainstorming', 'adaptable'],
    benchmarkAnswer: 'I appreciate a healthy balance of both. I value working independently when diving deep into complex coding tasks, conducting algorithmic research, or writing comprehensive unit tests with undivided focus. At the same time, I thrive in a collaborative team setting where we whiteboard architectures, exchange constructive feedback during code reviews, and solve multifaceted problems together. Being adaptable between both modes allows me to be both productive and aligned with team objectives.'
  },

  // 19. What are you passionate about?
  {
    id: 'hr-core-19-passion',
    role: 'General Interview',
    level: 'Beginner',
    type: 'HR',
    category: 'Personal Motivation & Passion',
    difficulty: 'Easy',
    question: 'What are you passionate about?',
    expectedConcepts: [
      'Genuine enthusiasm for technology, solving practical user challenges, or creative craft',
      'Concrete activities or side pursuits that reflect this passion',
      'How this passion translates into positive energy and dedication at work'
    ],
    expectedKeywords: ['passionate', 'passion', 'technology', 'problem solving', 'craft', 'impact', 'users', 'learning', 'open source', 'building'],
    benchmarkAnswer: 'I am deeply passionate about building software that directly improves people’s daily productivity and user experiences. There is something profoundly satisfying about turning an abstract problem into intuitive, reliable code that saves people time. Outside of daily assignments, I love exploring emerging web technologies, experimenting with open-source tools, and participating in tech community meetups, which keeps my enthusiasm for engineering fresh and inspired.'
  },

  // 20. Do you have any questions for the interviewer?
  {
    id: 'hr-core-20-questions',
    role: 'General Interview',
    level: 'Beginner',
    type: 'HR',
    category: 'Interviewer Questions',
    difficulty: 'Easy',
    question: 'Do you have any questions for the interviewer?',
    expectedConcepts: [
      'Thoughtful, curious questions about engineering culture and team workflows',
      'Inquiries about upcoming product roadmaps or technical challenges',
      'Questions about professional development and success metrics for the role'
    ],
    expectedKeywords: ['questions', 'team', 'culture', 'engineering', 'challenges', 'roadmap', 'success', 'onboarding', 'collaboration', 'technologies'],
    benchmarkAnswer: 'Yes, thank you! I would love to learn more about the team’s current engineering priorities and the biggest technical challenges you are tackling this quarter. Additionally, what does the typical day-to-day workflow look like between product and engineering, and how does the team define success for someone in this role over the first six months?'
  },

  // ==================== ADDITIONAL HR / COMMUNICATION QUESTIONS ====================
  // Preserved from initial question bank:
  {
    id: 'hr-core-6',
    role: 'General Interview',
    level: 'Intermediate',
    type: 'HR',
    category: 'Project Accomplishment',
    difficulty: 'Medium',
    question: 'Tell me about a project you are proud of.',
    expectedConcepts: [
      'Context, objectives, and role in the project',
      'Technical architecture or methodology utilized',
      'Measurable results, lessons learned, or positive user feedback'
    ],
    expectedKeywords: ['project', 'proud', 'architecture', 'implementation', 'challenge', 'outcome', 'impact', 'performance', 'solution', 'users'],
    benchmarkAnswer: 'I am particularly proud of developing an automated reporting and data pipeline for an analytics platform. The manual pipeline previously took hours to compile and suffered from data inconsistencies. I re-architected the ingestion workflow with automated validation checks and optimized queries. This cut processing time by over 70%, reduced error rates to zero, and provided stakeholders with real-time operational metrics.'
  },
  {
    id: 'hr-core-7',
    role: 'General Interview',
    level: 'Intermediate',
    type: 'HR',
    category: 'Problem Solving & Resilience',
    difficulty: 'Medium',
    question: 'Describe a challenge you faced and how you handled it.',
    expectedConcepts: [
      'Structured response using the STAR framework (Situation, Task, Action, Result)',
      'Constructive problem diagnosis and resilience under pressure',
      'Positive and durable outcome with professional takeaways'
    ],
    expectedKeywords: ['challenge', 'problem', 'action', 'solution', 'overcame', 'resilience', 'outcome', 'learning', 'resolved', 'star method'],
    benchmarkAnswer: 'In a prior project, we experienced a critical third-party API deprecation two weeks prior to scheduled release. Rather than panic, I performed an immediate impact assessment, isolated the dependent service modules, and identified an alternative library. I scheduled an emergency sync with team members, established clear task divisions, and developed adapter wrappers to minimize codebase refactoring. We delivered the updated integration on time without delaying the overall release.'
  },
  {
    id: 'hr-core-8',
    role: 'General Interview',
    level: 'Beginner',
    type: 'HR',
    category: 'Time Management',
    difficulty: 'Easy',
    question: 'How do you manage deadlines?',
    expectedConcepts: [
      'Deconstructing major milestones into actionable sprint items',
      'Prioritization frameworks (such as impact vs. effort or Eisenhower matrix)',
      'Early communication and risk mitigation if roadblocks emerge'
    ],
    expectedKeywords: ['deadlines', 'time management', 'prioritization', 'milestones', 'planning', 'communication', 'transparency', 'focus', 'delivery'],
    benchmarkAnswer: 'I manage deadlines by breaking deliverables down into discrete, estimable tasks with built-in buffers for unforeseen edge cases. I prioritize work based on urgency and dependencies, using tools like Kanban boards to track status. Crucially, if unexpected blockers arise, I communicate transparently with stakeholders well in advance to realign expectations and maintain quality.'
  },
  {
    id: 'hr-core-10',
    role: 'General Interview',
    level: 'Intermediate',
    type: 'HR',
    category: 'Conflict Management',
    difficulty: 'Medium',
    question: 'How do you handle disagreements in a team?',
    expectedConcepts: [
      'Separating interpersonal dynamics from objective technical arguments',
      'Grounding decisions in empirical data, benchmarks, or requirements',
      'Commitment to professional compromise and team consensus'
    ],
    expectedKeywords: ['disagreements', 'conflict', 'listen', 'objective', 'data', 'compromise', 'respect', 'resolution', 'consensus', 'perspective'],
    benchmarkAnswer: 'When disagreements arise, I focus on the problem rather than personal opinions. I listen carefully to understand the other person’s rationale and identify their underlying concerns. If the debate centers on technical choices, I propose prototyping or benchmarking both options against objective criteria like performance and maintainability. Once the team reaches a decision, I fully commit to executing it regardless of whose idea it originally was.'
  },
  {
    id: 'hr-core-11',
    role: 'General Interview',
    level: 'Intermediate',
    type: 'HR',
    category: 'Career Vision & Development',
    difficulty: 'Medium',
    question: 'Where do you see yourself developing professionally?',
    expectedConcepts: [
      'Ambition for deeper technical expertise and architecture skills',
      'Desire to take on mentorship and broader project ownership',
      'Commitment to continuous lifelong professional growth'
    ],
    expectedKeywords: ['developing', 'growth', 'career', 'future', 'leadership', 'architecture', 'mentorship', 'expertise', 'impact', 'continuous learning'],
    benchmarkAnswer: 'Over the next few years, I see myself deepening my technical expertise in system architecture and high-performance engineering. I want to evolve from delivering individual features to designing robust, scalable service components and mentoring junior developers. My goal is to become a dependable technical pillar who bridges business requirements with elegant engineering solutions.'
  },
  {
    id: 'hr-core-12',
    role: 'General Interview',
    level: 'Beginner',
    type: 'HR',
    category: 'Company & Culture Alignment',
    difficulty: 'Easy',
    question: 'Why are you interested in this company/role?',
    expectedConcepts: [
      'Appreciation of company mission, engineering culture, or innovation',
      'Desire to solve meaningful challenges at this organization’s scale',
      'Long-term cultural and professional fit'
    ],
    expectedKeywords: ['company', 'role', 'interest', 'mission', 'culture', 'innovation', 'scale', 'opportunity', 'values', 'contribution'],
    benchmarkAnswer: 'I am excited about this company because of its strong reputation for innovation, engineering rigor, and user-centric products. The challenges you are solving require both technical depth and creative problem-solving, which resonates strongly with my interests. I want to be part of a culture that emphasizes high engineering standards, collaborative growth, and real-world impact.'
  },
  {
    id: 'hr-core-13',
    role: 'General Interview',
    level: 'Intermediate',
    type: 'HR',
    category: 'Learning Agility',
    difficulty: 'Medium',
    question: 'Tell me about a time you learned something difficult.',
    expectedConcepts: [
      'Identification of a steep learning curve or unfamiliar concept',
      'Systematic approach: documentation, small experiments, hands-on practice',
      'Successful application of the new knowledge to solve a concrete task'
    ],
    expectedKeywords: ['learned', 'difficult', 'approach', 'practice', 'experiments', 'documentation', 'mastery', 'application', 'persistence', 'outcome'],
    benchmarkAnswer: 'When I first encountered asynchronous concurrent programming in distributed systems, the mental model was challenging. To master it, I broke down the theory, read the core documentation and community post-mortems, and built small sandbox experiments to observe race conditions and deadlocks firsthand. Through deliberate practice and experimentation, I gained confidence and successfully deployed an event-driven queue consumer in our project.'
  },
  {
    id: 'hr-core-15',
    role: 'General Interview',
    level: 'Beginner',
    type: 'HR',
    category: 'Working Style Preferences',
    difficulty: 'Easy',
    question: 'Do you prefer working independently or with a team? Explain.',
    expectedConcepts: [
      'Balanced perspective appreciating the virtues of both working styles',
      'Independent focus for deep implementation, research, and debugging',
      'Team collaboration for architecture brainstorming, code review, and goal alignment'
    ],
    expectedKeywords: ['independently', 'team', 'balance', 'collaboration', 'focus', 'ownership', 'discussion', 'brainstorming', 'adaptable', 'productivity'],
    benchmarkAnswer: 'I value a healthy balance of both. I thrive when working independently to deeply focus on writing clean code, researching algorithms, or debugging issues with high concentration. At the same time, I believe the best engineering outcomes come from team collaboration—such as whiteboarding architectures, conducting code reviews, and brainstorming solutions with colleagues. I adapt comfortably to whichever mode best serves the project at that moment.'
  },

  // Role and level tailored behavioral & communication questions:
  {
    id: 'hr-tailored-1',
    role: 'Python Developer',
    level: 'Intermediate',
    type: 'HR',
    category: 'Communication & Stakeholders',
    difficulty: 'Medium',
    question: 'How do you explain technical software concepts to non-technical stakeholders?',
    expectedConcepts: [
      'Translating technical jargon into plain business value and real-world analogies',
      'Focusing on user impact, timeline, and risk rather than implementation details',
      'Checking for understanding and encouraging questions'
    ],
    expectedKeywords: ['non-technical', 'stakeholders', 'analogy', 'business value', 'clarity', 'jargon', 'listen', 'impact', 'communication'],
    benchmarkAnswer: 'I avoid technical jargon and translate concepts into business outcomes and relatable analogies. For instance, rather than describing database indexing algorithms, I explain that indexing is like a textbook index that lets us jump directly to the right page instead of reading the book from cover to cover. I focus on how architectural decisions affect user latency, operational costs, and product timelines, and I pause regularly to invite questions.'
  },
  {
    id: 'hr-tailored-2',
    role: 'Java Developer',
    level: 'Advanced',
    type: 'HR',
    category: 'Code Quality & Deadlines',
    difficulty: 'Hard',
    question: 'How do you balance code quality and technical debt against strict shipping deadlines?',
    expectedConcepts: [
      'Pragmatic trade-offs between speed to market and long-term maintainability',
      'Documenting and tracking technical debt explicitly for future refactoring',
      'Maintaining non-negotiable standards for core reliability and test coverage'
    ],
    expectedKeywords: ['code quality', 'technical debt', 'balance', 'deadlines', 'pragmatic', 'refactoring', 'testing', 'documentation', 'trade-offs'],
    benchmarkAnswer: 'Balancing quality and velocity requires pragmatic engineering judgment. While meeting deadlines is essential for business viability, taking reckless shortcuts accumulates technical debt that cripples future releases. I protect core non-negotiables—such as data integrity, security, and automated integration tests. If we must choose a simpler intermediate implementation to hit a date, I document the debt in our backlog with clear remediation plans.'
  },
  {
    id: 'hr-tailored-3',
    role: 'Web Developer',
    level: 'Beginner',
    type: 'HR',
    category: 'Constructive Feedback',
    difficulty: 'Easy',
    question: 'Describe a time when you received constructive feedback on your code or work. How did you respond?',
    expectedConcepts: [
      'Maintaining an open, non-defensive growth mindset',
      'Understanding the rationale behind the reviewer’s suggestion',
      'Implementing the feedback and updating personal development habits'
    ],
    expectedKeywords: ['feedback', 'code review', 'growth mindset', 'learning', 'improvement', 'receptive', 'collaboration', 'quality', 'positive'],
    benchmarkAnswer: 'During a pull request review, a senior developer pointed out that my component state structure caused unnecessary re-renders across child views and suggested lifting the state and using memoization. Rather than feeling defensive, I saw it as a valuable learning opportunity. I asked clarifying questions to understand the performance implications, refactored the component accordingly, and documented the pattern so our whole team could reference it.'
  },
  {
    id: 'hr-tailored-4',
    role: 'Data Analyst',
    level: 'Intermediate',
    type: 'HR',
    category: 'Data Communication',
    difficulty: 'Medium',
    question: 'How do you communicate data insights or model limitations when business users want absolute certainty?',
    expectedConcepts: [
      'Transparently explaining probabilities, confidence intervals, and assumptions',
      'Framing limitations constructively as actionable risk assessments',
      'Visualizing distributions or scenarios rather than providing misleading single numbers'
    ],
    expectedKeywords: ['data', 'insights', 'limitations', 'uncertainty', 'confidence intervals', 'assumptions', 'risk', 'stakeholders', 'visualizations'],
    benchmarkAnswer: 'In data analysis, absolute certainty is rarely realistic. When stakeholders press for definitive answers, I communicate findings using confidence intervals and probabilistic scenarios rather than false point certainties. I present clear visual charts showing the distribution of possible outcomes and explain the key underlying assumptions in plain terms. This empowers decision-makers to weigh upside potential against quantified risk.'
  },
  {
    id: 'hr-tailored-5',
    role: 'Software Engineer',
    level: 'Advanced',
    type: 'HR',
    category: 'Mentorship & Knowledge Sharing',
    difficulty: 'Hard',
    question: 'Tell me about a time you mentored a junior colleague or onboarded a new team member.',
    expectedConcepts: [
      'Empathetic guidance and creating a psychologically safe learning environment',
      'Teaching problem-solving frameworks rather than simply giving answers',
      'Improving onboarding documentation and celebrating the mentee’s achievements'
    ],
    expectedKeywords: ['mentor', 'onboarding', 'guidance', 'patience', 'documentation', 'empower', 'growth', 'questions', 'support', 'collaboration'],
    benchmarkAnswer: 'When a new junior engineer joined our squad, I acted as their onboarding mentor. Instead of simply dictating answers when they encountered bugs, I paired with them, walked through our debugging tools, and encouraged them to reason through the execution flow. I also worked with them to update outdated sections of our setup documentation as they experienced them. Within a month, they were comfortably contributing standalone features with confidence.'
  }
];

export function getQuestionsForInterview(
  role: JobRole,
  level: ExperienceLevel,
  type: InterviewType,
  count: number
): Question[] {
  if (type === 'Technical') {
    let pool = QUESTION_BANK.filter(
      (q) => q.role === role && (q.level === level || level === 'Advanced') && q.type === 'Technical'
    );
    if (pool.length < count) {
      pool = QUESTION_BANK.filter((q) => q.role === role && q.type === 'Technical');
    }
    if (pool.length < count) {
      const extra = QUESTION_BANK.filter((q) => q.role === 'Software Engineer' && q.type === 'Technical');
      pool = [...pool, ...extra];
    }
    // Deduplicate
    const uniquePool = Array.from(new Map(pool.map((q) => [q.id, q])).values());
    const levelPriority: Record<ExperienceLevel, number> = { Beginner: 1, Intermediate: 2, Advanced: 3 };
    return [...uniquePool]
      .sort((a, b) => (levelPriority[a.level] || 1) - (levelPriority[b.level] || 1))
      .slice(0, count);
  }

  if (type === 'HR') {
    // Dedicated HR / Communication Interview
    // Natural interview progression starting with core HR questions (starting with "Tell me about yourself.")
    const coreHrQuestions = QUESTION_BANK.filter(
      (q) => q.type === 'HR' && q.role === 'General Interview'
    );
    const roleHrQuestions = QUESTION_BANK.filter(
      (q) => q.type === 'HR' && q.role === role
    );

    // Combine core natural interview sequence with any role-tailored communication questions
    const combinedHr = [...coreHrQuestions, ...roleHrQuestions];
    const uniqueHr = Array.from(new Map(combinedHr.map((q) => [q.id, q])).values());

    // Ensure the first question is always "Tell me about yourself."
    const introIndex = uniqueHr.findIndex((q) => q.question.toLowerCase().startsWith('tell me about yourself'));
    if (introIndex > 0) {
      const [introQ] = uniqueHr.splice(introIndex, 1);
      uniqueHr.unshift(introQ);
    }

    // Never repeat questions in the same interview
    return uniqueHr.slice(0, count);
  }

  // Mixed Interview: Strictly alternate between technical and HR questions
  // Q1 -> Technical, Q2 -> HR, Q3 -> Technical, Q4 -> HR, ...
  let techPool = QUESTION_BANK.filter(
    (q) => q.type === 'Technical' && (q.role === role || q.role === 'Software Engineer')
  );
  if (techPool.length === 0) {
    techPool = QUESTION_BANK.filter((q) => q.type === 'Technical');
  }

  const roleHr = QUESTION_BANK.filter((q) => q.type === 'HR' && q.role === role);
  const generalHr = QUESTION_BANK.filter((q) => q.type === 'HR' && q.role === 'General Interview');
  const hrPool = Array.from(new Map([...roleHr, ...generalHr].map((q) => [q.id, q])).values());

  const mixedList: Question[] = [];
  let techIdx = 0;
  let hrIdx = 0;

  for (let i = 0; i < count; i++) {
    if (i % 2 === 0) {
      // Even index (0, 2, 4...) -> Technical
      if (techIdx < techPool.length) {
        mixedList.push(techPool[techIdx++]);
      } else if (hrIdx < hrPool.length) {
        mixedList.push(hrPool[hrIdx++]);
      }
    } else {
      // Odd index (1, 3, 5...) -> HR
      if (hrIdx < hrPool.length) {
        mixedList.push(hrPool[hrIdx++]);
      } else if (techIdx < techPool.length) {
        mixedList.push(techPool[techIdx++]);
      }
    }
  }

  return mixedList;
}
