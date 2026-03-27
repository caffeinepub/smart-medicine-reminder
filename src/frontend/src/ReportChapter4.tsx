export default function ReportChapter4() {
  return (
    <>
      <style>{`
        .report-page {
          font-family: 'Times New Roman', Times, serif;
          font-size: 14px;
          line-height: 1.8;
          color: #000;
          background: #fff;
          max-width: 800px;
          margin: 0 auto;
          padding: 60px 60px 80px;
        }
        .report-nav {
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 100;
        }
        .report-back-link {
          font-family: Arial, sans-serif;
          font-size: 13px;
          color: #555;
          text-decoration: none;
          background: #f0f0f0;
          padding: 6px 12px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
        .report-back-link:hover { background: #e0e0e0; }
        .print-btn {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 100;
          font-family: Arial, sans-serif;
          font-size: 14px;
          font-weight: 600;
          background: #1a56db;
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .print-btn:hover { background: #1648c0; }
        .report-page h1 {
          font-size: 20px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 8px;
          margin-top: 40px;
        }
        .report-page h2 {
          font-size: 16px;
          font-weight: bold;
          margin-top: 32px;
          margin-bottom: 10px;
        }
        .report-page h3 {
          font-size: 14px;
          font-weight: bold;
          margin-top: 24px;
          margin-bottom: 8px;
        }
        .report-page p { margin-bottom: 12px; text-align: justify; }
        .report-page ul { margin: 8px 0 12px 28px; padding: 0; }
        .report-page li { margin-bottom: 6px; }
        .report-table {
          width: 100%;
          border-collapse: collapse;
          margin: 16px 0 20px;
          font-size: 13px;
        }
        .report-table th {
          background: #f2f2f2;
          font-weight: bold;
          border: 1px solid #999;
          padding: 7px 10px;
          text-align: left;
        }
        .report-table td {
          border: 1px solid #bbb;
          padding: 6px 10px;
          vertical-align: top;
        }
        .report-table tr:nth-child(even) td { background: #fafafa; }
        .collection-title {
          margin: 20px 0 4px;
          font-weight: bold;
          font-size: 14px;
        }
        @media print {
          .report-nav, .print-btn { display: none !important; }
          body { margin: 0; padding: 0; background: #fff; }
          .report-page {
            max-width: 100%;
            margin: 0;
            padding: 20mm 20mm 25mm;
            font-size: 12pt;
            line-height: 1.5;
          }
          .report-page h1 { font-size: 16pt; }
          .report-page h2 { font-size: 14pt; }
          .report-page h3 { font-size: 12pt; }
          .report-table { font-size: 11pt; }
          .report-table th {
            background: #e8e8e8 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          h2, h3 { page-break-after: avoid; }
          table { page-break-inside: avoid; }
        }
      `}</style>

      <div className="report-nav">
        <a href="/" className="report-back-link">
          ← Back to App
        </a>
      </div>

      <button
        type="button"
        className="print-btn"
        onClick={() => window.print()}
      >
        🖨 Print / Save as PDF
      </button>

      <div className="report-page">
        <h1>Chapter 4: TECHNOLOGY USED</h1>

        <h2>4.1 Introduction</h2>
        <p>
          The development of any modern web application requires a carefully
          selected set of technologies that collectively support its functional,
          performance, and scalability requirements. The selection of the right
          technology stack is one of the most critical decisions in the software
          development lifecycle, as it directly influences the reliability,
          speed, user experience, and long-term maintainability of the system.
        </p>
        <p>
          MediRemind – Smart Medicine Reminder is a full-stack web application
          developed using a modern, component-based architecture. The project
          uses a combination of frontend technologies for user interface design
          and interaction, a decentralized backend platform for server-side
          logic and data processing, and a blockchain-based persistent storage
          system for secure and tamper-resistant data management.
        </p>
        <p>
          The technologies used in this project were selected based on the
          following principles:
        </p>
        <ul>
          <li>
            <strong>Performance:</strong> Technologies that ensure fast load
            times and responsive interactions.
          </li>
          <li>
            <strong>Security:</strong> Platforms that provide built-in
            authentication, access control, and encrypted communication.
          </li>
          <li>
            <strong>Scalability:</strong> Tools capable of handling increasing
            users and data without architectural changes.
          </li>
          <li>
            <strong>Decentralization:</strong> The use of the Internet Computer
            Protocol (ICP) ensures that the application is not dependent on any
            single centralized server, making it more resilient and trustworthy.
          </li>
          <li>
            <strong>Developer Productivity:</strong> Technologies with strong
            documentation, community support, and tooling ecosystems.
          </li>
        </ul>

        <h2>4.2 Frontend Technologies</h2>
        <p>
          The frontend of MediRemind is the user-facing layer of the
          application. It is responsible for rendering the interface, handling
          user input, managing application state, and communicating with the
          backend. The frontend is built as a{" "}
          <strong>Single-Page Application (SPA)</strong>, meaning the entire
          application loads once in the browser and dynamically updates content
          without requiring full page reloads.
        </p>

        <h3>4.2.1 HTML5 (HyperText Markup Language)</h3>
        <p>
          HTML5 is the latest version of the standard markup language used to
          structure content on the web. It provides the skeleton of every web
          page by defining elements such as headings, forms, input fields,
          buttons, containers, and lists.
        </p>
        <p>In MediRemind, HTML5 is used to:</p>
        <ul>
          <li>
            Define the structural layout of the application, including the
            login/registration page, dashboard, reminder forms, search
            interface, analytics section, history log, and user profile page.
          </li>
          <li>
            Provide semantic elements (<code>section</code>,{" "}
            <code>article</code>, <code>nav</code>, <code>header</code>,{" "}
            <code>main</code>) that improve readability of code and
            accessibility for screen readers.
          </li>
          <li>
            Embed SVG (Scalable Vector Graphics) elements directly into the page
            for rendering custom icons, adherence bar charts, and the flame
            animation used in the streak tracker.
          </li>
          <li>
            Support the <code>input type="file"</code> element for the profile
            photo upload feature.
          </li>
          <li>
            Define the <code>link</code> tag for the custom favicon (pill icon)
            displayed in the browser tab.
          </li>
        </ul>
        <p>
          HTML5 provides the foundational document structure upon which all
          visual components and interactive behaviors are built.
        </p>

        <h3>4.2.2 CSS3 and Tailwind CSS</h3>
        <p>
          CSS3 (Cascading Style Sheets, version 3) is the styling language used
          to control the visual presentation of HTML elements. It defines
          colors, fonts, spacing, layout, transitions, animations, and
          responsive behavior.
        </p>
        <p>
          Tailwind CSS is a utility-first CSS framework that provides a large
          set of pre-defined, single-purpose CSS classes that can be composed
          directly in HTML or JSX markup to style components without writing
          custom CSS files.
        </p>
        <p>In MediRemind, CSS3 and Tailwind CSS are used to:</p>
        <ul>
          <li>
            Implement a fully responsive layout that adapts to different screen
            sizes (desktops, tablets, and mobile browsers).
          </li>
          <li>
            Apply a dark mode theme by toggling Tailwind's <code>dark:</code>{" "}
            variant classes, which change background colors, text colors, and
            border styles when dark mode is activated.
          </li>
          <li>
            Create smooth transition animations for UI elements such as tab
            switching, modal dialogs, and button hover effects.
          </li>
          <li>
            Style the profile card, medical records sections, and dashboard
            widgets with card-based layouts using Tailwind's shadow, rounded,
            border, and flex utilities.
          </li>
          <li>
            Implement the pulsing green dot visual indicator in the header using
            Tailwind's <code>animate-pulse</code> utility.
          </li>
          <li>
            Render the 7-day adherence bar chart and flame streak animation
            using inline SVG combined with CSS transformations and color
            utilities.
          </li>
        </ul>

        <h3>4.2.3 JavaScript (ES6+)</h3>
        <p>
          JavaScript is the primary programming language of the web. It enables
          dynamic behavior, user interaction handling, data manipulation, and
          communication with external services entirely within the browser
          environment. MediRemind uses modern ES6+ features including arrow
          functions, destructuring, async/await, Promises, modules, template
          literals, and the Fetch API.
        </p>
        <p>Key uses of JavaScript in this project include:</p>
        <ul>
          <li>
            <strong>Reminder notification scheduling:</strong> A{" "}
            <code>setInterval</code> loop runs every 30 seconds, comparing the
            current system time (HH:MM) against all scheduled reminder times
            stored in the backend. When a match is found, it triggers a browser
            notification popup and a voice alert.
          </li>
          <li>
            <strong>Web Speech API (SpeechSynthesis):</strong> JavaScript's
            built-in <code>window.speechSynthesis</code> interface reads
            reminder alerts aloud (e.g., "Time to take your Metformin 500mg").
          </li>
          <li>
            <strong>Browser Notifications API:</strong> JavaScript requests
            notification permission and dispatches <code>Notification</code>{" "}
            objects at scheduled times to display desktop reminder popups.
          </li>
          <li>
            <strong>PBKDF2 Key Derivation:</strong> The{" "}
            <code>SubtleCrypto</code> Web API derives a stable Ed25519 keypair
            from the user's username and password using 100,000 iterations of
            PBKDF2 with SHA-256. This keypair becomes the user's unique Internet
            Computer identity.
          </li>
          <li>
            <strong>CSV Export:</strong> A client-side function constructs a
            comma-separated string from the dose log data and triggers a browser
            file download.
          </li>
          <li>
            <strong>sessionStorage Management:</strong> The password-derived
            identity seed is stored in <code>sessionStorage</code>, enabling
            session persistence across page refreshes without re-authentication.
          </li>
        </ul>

        <h3>4.2.4 React and TypeScript (with Vite)</h3>
        <p>
          React is an open-source JavaScript library developed by Meta for
          building component-based user interfaces. TypeScript is a statically
          typed superset of JavaScript developed by Microsoft that adds type
          annotations and compile-time error checking. Vite is a modern frontend
          build tool providing near-instant hot module replacement (HMR) during
          development.
        </p>
        <p>In MediRemind, React and TypeScript are used to:</p>
        <ul>
          <li>
            Build the entire application as a Single-Page Application with
            components: <code>LoginPage</code>, <code>RegisterPage</code>,{" "}
            <code>DashboardPage</code>, <code>ReminderTab</code>,{" "}
            <code>SearchTab</code>, <code>AnalyticsTab</code>,{" "}
            <code>HistoryTab</code>, <code>ProfileTab</code>, and{" "}
            <code>Header</code>.
          </li>
          <li>
            Manage global authentication state using the React Context API (
            <code>AuthContext</code>), providing the logged-in user's identity
            to all child components.
          </li>
          <li>
            Implement the <code>useActor</code> custom hook, which creates an
            authenticated ICP Actor using the active identity (
            <code>iiIdentity ?? passwordIdentity</code>) for all backend
            canister calls.
          </li>
          <li>
            Implement the <code>useReminderNotifications</code> custom hook for
            background notification monitoring on component mount.
          </li>
          <li>
            Provide full TypeScript type safety for all backend API calls using
            auto-generated <code>backend.d.ts</code> type definitions,
            preventing type mismatches between frontend and backend.
          </li>
        </ul>

        <h2>4.3 Backend Technology</h2>
        <p>
          The backend of MediRemind is deployed as a{" "}
          <strong>smart contract (canister)</strong> on the{" "}
          <strong>Internet Computer Protocol (ICP)</strong> — a decentralized
          blockchain network — rather than a traditional centralized cloud
          server.
        </p>

        <h3>4.3.1 Internet Computer Protocol (ICP)</h3>
        <p>
          The Internet Computer Protocol (ICP) is a blockchain-based,
          decentralized computing platform developed by the DFINITY Foundation.
          It allows developers to deploy software (called{" "}
          <strong>canisters</strong>) onto a distributed network of nodes,
          eliminating the need for traditional centralized cloud servers.
        </p>
        <p>Key characteristics of ICP used in MediRemind:</p>
        <ul>
          <li>
            <strong>Always-on availability:</strong> Canisters run on a global
            network of independent nodes with no server maintenance or downtime
            windows.
          </li>
          <li>
            <strong>Tamper-resistant storage:</strong> All data is replicated
            across multiple nodes and cryptographically secured, making it
            resistant to unauthorized modification.
          </li>
          <li>
            <strong>Built-in authentication:</strong> ICP provides Internet
            Identity — a native Web3 authentication system assigning each user a
            unique IC principal.
          </li>
          <li>
            <strong>HTTPS Outcalls:</strong> ICP canisters can make outbound
            HTTPS requests to external APIs (such as OpenFDA and Hugging Face)
            directly from the backend.
          </li>
        </ul>

        <h3>4.3.2 Motoko Programming Language</h3>
        <p>
          Motoko is a programming language specifically designed by the DFINITY
          Foundation for writing smart contracts on the Internet Computer. It is
          statically typed and actor-based with built-in support for ICP's
          asynchronous messaging model and stable memory management.
        </p>
        <p>In MediRemind, Motoko is used to implement:</p>
        <ul>
          <li>
            User registration and authentication with hashed credentials stored
            and validated in the backend.
          </li>
          <li>
            Full CRUD (Create, Read, Update, Delete) operations for medicine
            reminders stored per user under their unique IC principal.
          </li>
          <li>
            Dose log management recording every dose action (taken or missed)
            with timestamps.
          </li>
          <li>
            User profile storage including name, age, gender, locality, email,
            profile photo, doctor guidance, and checkup reports — all keyed by
            the user's IC principal.
          </li>
          <li>
            HTTPS Outcalls to OpenFDA API and Hugging Face API in production,
            bypassing browser Content Security Policy (CSP) restrictions.
          </li>
          <li>
            Role-based access control restricting each user to reading and
            writing only their own data.
          </li>
        </ul>

        <h3>4.3.3 Internet Identity (Authentication)</h3>
        <p>
          Internet Identity is ICP's native decentralized authentication system.
          MediRemind supports two authentication methods:
        </p>
        <table className="report-table">
          <thead>
            <tr>
              <th>Method</th>
              <th>Mechanism</th>
              <th>Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Username + Password</td>
              <td>PBKDF2 key derivation → Ed25519 identity</td>
              <td>General users unfamiliar with Web3</td>
            </tr>
            <tr>
              <td>Internet Identity</td>
              <td>ICP browser-based cryptographic identity</td>
              <td>Web3-native users</td>
            </tr>
          </tbody>
        </table>
        <p>
          Both methods produce a valid IC principal used to sign all backend
          canister calls, ensuring data ownership and secure access without
          session tokens or cookies.
        </p>

        <h2>4.4 Database Technology</h2>
        <p>
          MediRemind does not use a traditional relational database or a
          document-based database hosted on a centralized server. Instead, all
          persistent data is stored in the{" "}
          <strong>stable memory of the ICP backend canister</strong>, which
          serves simultaneously as the application server and the database
          engine.
        </p>

        <h3>4.4.1 ICP Canister Stable Memory</h3>
        <p>
          Stable memory in ICP is a region of memory allocated to each canister
          that persists across canister upgrades and is automatically replicated
          across all subnet nodes.
        </p>
        <p>Key properties of stable memory as a data store:</p>
        <ul>
          <li>
            <strong>Persistence:</strong> Data survives canister upgrades,
            restarts, and network events. No data migration is required when
            deploying new code versions.
          </li>
          <li>
            <strong>Replication:</strong> Data is automatically replicated
            across multiple independent nodes for fault tolerance without
            additional configuration.
          </li>
          <li>
            <strong>Access control:</strong> Only the canister's own Motoko code
            can read or write to its stable memory. No external party can
            directly access or tamper with the data.
          </li>
          <li>
            <strong>No separate database engine:</strong> The canister acts as
            both application logic layer and data storage layer, eliminating the
            need for ORM or database connection management.
          </li>
        </ul>

        <h3>4.4.2 Data Structure and Collections</h3>
        <p>
          The following data structures are maintained in the canister's stable
          memory:
        </p>

        <p className="collection-title">Users Collection</p>
        <table className="report-table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>principal</td>
              <td>Text</td>
              <td>Unique user identifier (IC principal)</td>
            </tr>
            <tr>
              <td>username</td>
              <td>Text</td>
              <td>Chosen login username</td>
            </tr>
            <tr>
              <td>passwordHash</td>
              <td>Text</td>
              <td>PBKDF2-hashed password for verification</td>
            </tr>
            <tr>
              <td>fullName</td>
              <td>Text</td>
              <td>User's full name</td>
            </tr>
            <tr>
              <td>email</td>
              <td>Text</td>
              <td>User's email address</td>
            </tr>
            <tr>
              <td>age</td>
              <td>Nat</td>
              <td>User's age</td>
            </tr>
            <tr>
              <td>gender</td>
              <td>Text</td>
              <td>User's gender</td>
            </tr>
            <tr>
              <td>locality</td>
              <td>Text</td>
              <td>User's address or locality</td>
            </tr>
            <tr>
              <td>profilePhotoId</td>
              <td>?Text</td>
              <td>Blob storage ID for profile photo (optional)</td>
            </tr>
            <tr>
              <td>lastUpdated</td>
              <td>Int</td>
              <td>Timestamp of last profile update</td>
            </tr>
          </tbody>
        </table>

        <p className="collection-title">Reminders Collection</p>
        <table className="report-table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id</td>
              <td>Text</td>
              <td>Unique reminder identifier</td>
            </tr>
            <tr>
              <td>userPrincipal</td>
              <td>Text</td>
              <td>Owner's IC principal</td>
            </tr>
            <tr>
              <td>medicineName</td>
              <td>Text</td>
              <td>Name of the medicine</td>
            </tr>
            <tr>
              <td>dosage</td>
              <td>Text</td>
              <td>Dosage amount (e.g., "500mg")</td>
            </tr>
            <tr>
              <td>frequency</td>
              <td>Text</td>
              <td>Frequency (e.g., "Once daily")</td>
            </tr>
            <tr>
              <td>scheduledTime</td>
              <td>Text</td>
              <td>Reminder time in HH:MM format</td>
            </tr>
            <tr>
              <td>isActive</td>
              <td>Bool</td>
              <td>Whether the reminder is currently active</td>
            </tr>
            <tr>
              <td>createdAt</td>
              <td>Int</td>
              <td>Creation timestamp</td>
            </tr>
          </tbody>
        </table>

        <p className="collection-title">Dose Log Collection</p>
        <table className="report-table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id</td>
              <td>Text</td>
              <td>Unique log entry identifier</td>
            </tr>
            <tr>
              <td>userPrincipal</td>
              <td>Text</td>
              <td>Owner's IC principal</td>
            </tr>
            <tr>
              <td>reminderId</td>
              <td>Text</td>
              <td>Reference to the associated reminder</td>
            </tr>
            <tr>
              <td>medicineName</td>
              <td>Text</td>
              <td>Name of the medicine</td>
            </tr>
            <tr>
              <td>scheduledTime</td>
              <td>Text</td>
              <td>Scheduled dose time</td>
            </tr>
            <tr>
              <td>actionTime</td>
              <td>Int</td>
              <td>Timestamp when action was recorded</td>
            </tr>
            <tr>
              <td>status</td>
              <td>Text</td>
              <td>"taken" or "missed"</td>
            </tr>
          </tbody>
        </table>

        <p className="collection-title">Medical Records Collection</p>
        <table className="report-table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>userPrincipal</td>
              <td>Text</td>
              <td>Owner's IC principal</td>
            </tr>
            <tr>
              <td>doctorName</td>
              <td>Text</td>
              <td>Name of the treating doctor</td>
            </tr>
            <tr>
              <td>prescribedTreatment</td>
              <td>Text</td>
              <td>Doctor's prescribed treatment details</td>
            </tr>
            <tr>
              <td>checkupDate</td>
              <td>Text</td>
              <td>Date of the last medical checkup</td>
            </tr>
            <tr>
              <td>checkupNotes</td>
              <td>Text</td>
              <td>Notes from the checkup or visit</td>
            </tr>
            <tr>
              <td>lastUpdated</td>
              <td>Int</td>
              <td>Timestamp of last update</td>
            </tr>
          </tbody>
        </table>
        <p>
          All collections are stored as hash maps in Motoko stable variables,
          providing O(1) average-case access by user principal. This design
          ensures fast data retrieval even as the number of users grows.
        </p>

        <h2>4.5 Tools and Development Environment</h2>

        <h3>4.5.1 Visual Studio Code (VS Code)</h3>
        <p>
          Visual Studio Code is a free, open-source, cross-platform source code
          editor developed by Microsoft. It is the most widely used code editor
          in the web development community, offering a rich ecosystem of
          extensions, built-in Git integration, IntelliSense (code completion),
          error highlighting, and an integrated terminal.
        </p>
        <p>In this project, VS Code was used to:</p>
        <ul>
          <li>
            Write and edit all frontend source files (TypeScript, TSX, CSS,
            HTML).
          </li>
          <li>Write and edit Motoko backend canister code.</li>
          <li>
            Use the built-in terminal to run the Vite development server,
            install npm packages, and execute deployment commands.
          </li>
          <li>
            Leverage TypeScript IntelliSense for auto-completion of React
            component props, ICP Agent methods, and backend API types.
          </li>
          <li>
            View real-time linting and type errors in the editor as code was
            written, reducing debugging time significantly.
          </li>
        </ul>

        <h3>4.5.2 Google Chrome (Web Browser)</h3>
        <p>
          Google Chrome was used as the primary browser for development,
          testing, and debugging of the MediRemind application.
        </p>
        <p>Chrome was used for:</p>
        <ul>
          <li>
            Rendering and visually testing the application's user interface
            across multiple viewport sizes using Chrome DevTools' device
            emulation mode.
          </li>
          <li>
            Using Chrome DevTools (F12) to inspect HTML elements, debug
            JavaScript, monitor network requests (Fetch/XHR), view console logs,
            and analyze performance.
          </li>
          <li>
            Testing the Browser Notifications API — Chrome grants notification
            permissions and displays desktop reminder popups.
          </li>
          <li>
            Testing the Web Speech API (SpeechSynthesis) for voice reminder
            alerts.
          </li>
          <li>
            Testing Internet Identity authentication flow, which requires a
            modern browser with WebAuthn support.
          </li>
        </ul>

        <h3>4.5.3 Git and GitHub</h3>
        <p>
          Git is a distributed version control system used to track changes in
          source code during development. GitHub is a cloud-based platform that
          hosts Git repositories and provides collaboration features such as
          pull requests, issue tracking, and code review.
        </p>
        <p>In this project, Git and GitHub were used to:</p>
        <ul>
          <li>
            Maintain a complete history of all code changes, enabling rollback
            to any previous working state if a bug was introduced.
          </li>
          <li>
            Track versions V8 through V23+ of the application, each
            corresponding to a specific set of bug fixes or feature additions.
          </li>
          <li>
            Serve as the source of truth for the project's codebase, ensuring
            the deployed version always corresponds to a specific, identifiable
            commit.
          </li>
        </ul>
        <p>
          <strong>GitHub Repository:</strong> [Add Your Project GitHub Link
          Here]
        </p>

        <h3>4.5.4 Caffeine AI Platform</h3>
        <p>
          The Caffeine AI Platform is a full-stack Internet Computer application
          scaffolding and deployment platform used to develop, iterate, and
          deploy MediRemind. It provides:
        </p>
        <ul>
          <li>
            Automated Motoko backend canister generation from functional
            requirements.
          </li>
          <li>
            Frontend scaffolding with React, TypeScript, Vite, and Tailwind CSS
            pre-configured.
          </li>
          <li>
            One-click deployment to the ICP network as both draft (shareable
            preview) and production (public) builds.
          </li>
          <li>
            Auto-generated TypeScript bindings (<code>backend.d.ts</code>) from
            the Motoko canister's Candid interface, ensuring type-safe
            frontend-to-backend communication.
          </li>
          <li>
            Integrated blob storage component for profile photo upload and
            retrieval.
          </li>
        </ul>

        <h3>4.5.5 npm and Vite</h3>
        <p>
          npm (Node Package Manager) is the standard package manager for the
          JavaScript ecosystem, used to install and manage project dependencies
          such as the ICP Agent library, React, and Tailwind CSS.
        </p>
        <p>Vite provides:</p>
        <ul>
          <li>
            A fast local development server with{" "}
            <strong>Hot Module Replacement (HMR)</strong>, instantly reflecting
            code changes in the browser without a full page reload.
          </li>
          <li>
            An optimized production build pipeline using Rollup, which
            tree-shakes unused code and generates minified, cache-optimized
            bundles for deployment.
          </li>
        </ul>

        <h3>4.5.6 OpenFDA API and Hugging Face Inference API</h3>
        <p>
          Two external APIs are integrated into MediRemind for the medicine
          information lookup feature:
        </p>
        <p>
          <strong>OpenFDA API</strong> (
          <code>https://api.fda.gov/drug/label.json</code>): A free, publicly
          available REST API maintained by the U.S. Food and Drug
          Administration. It provides structured drug labeling data including
          indications, dosage instructions, contraindications, warnings, and
          manufacturer information for thousands of approved drugs. No API key
          is required. Response time is approximately 200ms for a direct browser
          fetch.
        </p>
        <p>
          <strong>Hugging Face Inference API</strong> (Model:{" "}
          <code>facebook/bart-large-cnn</code>): A free AI inference API used to
          generate concise, plain-language summaries of raw FDA drug label text.
          The <code>facebook/bart-large-cnn</code> model is a transformer-based
          abstractive summarization model trained on CNN/DailyMail news
          articles. It is used in MediRemind to generate an "AI Summary" making
          medicine information accessible to non-medical users.
        </p>

        <h3>Summary of Technologies Used</h3>
        <table className="report-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Technology</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Markup</td>
              <td>HTML5</td>
              <td>Page structure and semantic layout</td>
            </tr>
            <tr>
              <td>Styling</td>
              <td>CSS3 + Tailwind CSS</td>
              <td>Responsive design, dark mode, animations</td>
            </tr>
            <tr>
              <td>Scripting</td>
              <td>JavaScript (ES6+)</td>
              <td>Notifications, speech, crypto, timers</td>
            </tr>
            <tr>
              <td>UI Framework</td>
              <td>React + TypeScript</td>
              <td>Component-based SPA with type safety</td>
            </tr>
            <tr>
              <td>Build Tool</td>
              <td>Vite</td>
              <td>Dev server and production build pipeline</td>
            </tr>
            <tr>
              <td>Backend Language</td>
              <td>Motoko</td>
              <td>Smart contract logic on ICP</td>
            </tr>
            <tr>
              <td>Backend Platform</td>
              <td>Internet Computer (ICP)</td>
              <td>Decentralized hosting, HTTPS outcalls</td>
            </tr>
            <tr>
              <td>Authentication</td>
              <td>Internet Identity + PBKDF2/Ed25519</td>
              <td>Secure user login and identity</td>
            </tr>
            <tr>
              <td>Data Storage</td>
              <td>ICP Stable Memory</td>
              <td>Persistent, replicated data store</td>
            </tr>
            <tr>
              <td>File Storage</td>
              <td>ICP Blob Storage</td>
              <td>Profile photo upload and retrieval</td>
            </tr>
            <tr>
              <td>Medicine Data</td>
              <td>OpenFDA API</td>
              <td>Drug label and dosage information</td>
            </tr>
            <tr>
              <td>AI Summarization</td>
              <td>Hugging Face (BART)</td>
              <td>Plain-language medicine summaries</td>
            </tr>
            <tr>
              <td>Code Editor</td>
              <td>VS Code</td>
              <td>Development and debugging</td>
            </tr>
            <tr>
              <td>Browser</td>
              <td>Google Chrome</td>
              <td>Testing and DevTools debugging</td>
            </tr>
            <tr>
              <td>Version Control</td>
              <td>Git + GitHub</td>
              <td>Code history and repository hosting</td>
            </tr>
            <tr>
              <td>Deployment</td>
              <td>Caffeine AI Platform</td>
              <td>ICP canister scaffolding and deployment</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
